<template>
	<v-layout align-center justify-center row fill-height id="share-card">
		<v-flex xs12 sm6>
		 	<div class="open-pack-popup">
		 	<div class="header-part"><v-btn icon dark v-on:click="goBack" class="close-icon">
					<v-icon>close</v-icon>	
				</v-btn>
		 
		 	<div class="header-part-left">
      	<div class="custm_back_for_left_top" v-if="playerCard.userData">
       		<div class="sm3 avtar" :style="{ backgroundImage: 'url(' + playerCard.userData.avatar + ' )' }" >
       			<div class="avtar-top"></div>
       			<div class="avtar-bottom"></div>
       		</div>
       		<ul class="left_box_profile">
       			<li><span class="top_text_profile"> {{playerCard.userData.displayName}} </span></li>
       			<!-- <li><span class="bottom_price_profile">{{playerCard.userData.customEmail}} </span></li> -->
       		</ul>
       	</div>
		 	</div>
		 	 	<div class="header-part-right">
		 	 <v-btn icon>
	            <v-icon>favorite</v-icon>
	          </v-btn>
	          <v-btn icon @click="social_show =!social_show">
	            <v-icon>share</v-icon>
	          </v-btn>
             
	          <social-sharing  v-if="social_show" :url="link"
                        v-cloak inline-template>
					    <div class="social-share">
					      <network network="facebook">
					        <i class="fa fa-fw fa-facebook"></i>
					      </network>
					      <network network="googleplus">
					        <i class="fa fa-fw fa-google-plus"></i>
					      </network>
					      <network network="linkedin">
					        <i class="fa fa-fw fa-linkedin"></i>
					      </network>
					      <network network="pinterest">
					        <i class="fa fa-fw fa-pinterest"></i>
					      </network>
					      <network network="twitter">
					        <i class="fa fa-fw fa-twitter"></i>
					      </network>
					    </div>
					  </social-sharing>
		 	</div>
		 		</div>
				<site-loader v-if="panel_loading"></site-loader>
				<div v-else-if="empty_record" class="empty_record">Card Not Found.</div>
        <v-card-text v-else @load="activate">
        	<div id="cardShare">
	        	<v-flex xs12 align-center justify-center row fill-height>
	        		<h2>'{{playerCard.playerName}}'</h2>
	        	</v-flex>
		        <CardBackground >
							<template slot="legend">
								<PlayerCard
									:playerCard="playerCard" 
									:directShow="true"/>
							</template>
						</CardBackground>
					</div>
        </v-card-text>
      
        <v-card-actions v-if="this.$store.getters.isLoggedIn">
         <v-flex xs12 sm7 align-end justify-center row fill-height>
			 		<v-spacer></v-spacer>
	         
	          
	        <!-- <SocialShare v-if="social_show"
      					:url="link"
                title="The Progressive JavaScript Framework"
                description="Intuitive, Fast and Composable MVVM for building interactive interfaces."
                quote="Vue is a progressive framework for building user interfaces."
                hashtags="vuejs,javascript,framework"
                twitter-user="vuejs" />-->
					</v-flex>
        </v-card-actions>
        <v-card-actions v-else>
        	<div class="share-login col-sm-7">
        		<img src="../../assets/img/csc0-shild-logo.png" class="claim-pack" />
        		<span>Claim Your <b>free</b> pack <br>at CSGOultimate.gg</span>
        	</div>
        	<div class="share-login col-sm-5">
        		<img  class="loginButton steam-login-btn" v-on:click="callAccounts()" src='../../assets/img/steam-signin-logo.png'>
        	</div>
      	</v-card-actions>
	    </div>
		</v-flex>

	</v-layout>
</template>
<script>

import vuetifyToast from 'vuetify-toast'
import CardBackground from '@/components/packs/open/CardBackground'
import PlayerCard from '@/components/packs/open/PlayerCard'
//import SocialShare from '@/components/shared/SocialShare'

import anime from 'animejs'

export default {
	layout: 'full',
	mounted() {
		this.fetchData(),
		this.link = window.location.href
	},
	components: {  
		CardBackground,
		PlayerCard,
		//SocialShare,
	},
	data() {
		return {
			direction: 'top',
			fab: false,
			fling: false,
			hover: true,
			tabs: null,
			top: false,
			right: true,
			bottom: true,
			left: false,
			transition: 'slide-y-reverse-transition',
			panel_loading: true,
			empty_record: false,
			social_show: false,
			isHidden: true,

			playerCard: {	},
			profile: {	},
			link: ''
		}
	},
	methods: {
		goBack() {
			this.$router.go(-1)
		},
		fetchData(){
			let cardId = this.decodeCode(this.$route.params.id);
			this.$store.dispatch('itemsplayers/getItemPlayer', cardId)
        .then((response) => {
        	if(response.data){
	          this.currentSort = 'overallScore'
	          this.currentSortDir = 'Desc'
	          this.playerCard = this.$store.getters['itemsplayers/itemPlayer']
	          this.panel_loading = false
	        }else{
	        	this.panel_loading = false;
	        	this.empty_record = true;
	        }
        })
        .catch((error) => {
          vuetifyToast.error(error.response.data.data)
          this.panel_loading = false
        })
		},
		activate() {
      setTimeout(()=>{
        var basicTimeline = anime.timeline();
        basicTimeline
        .add({
          targets: '#cardShare',
          opacity: 0,
          duration: 5000,
          easing: 'linear'
        })
      }, 5000)
    },
		callAccounts () {
			location.href = '/api/auth/steam'
		},
	}
}
</script>

<style scope>
.empty_record{
  min-height: 200px;
  text-align: center;
  padding-top: 60px;
  font-size: 20px;
}
#share-card .left_box_profile{ margin-top: 32px; }
</style>