<template>
	<v-layout class="tab-layout" :class="{sideHide: this.$store.state.sideHide}">
	 <v-container class="pack-container" fluid grid-list-md>
			<carousel v-if="packs.length>0" :perPageCustom="[[0, 1], [480, 2], [	910, 3], [	1259, 4], [	1559, 5]]" :paginationEnabled="false" :navigationEnabled="true" :navigationClickTargetSize="5">
			    <slide v-for="(pack, index) in packs" :key="index" :class="{'pack_opening': pack.open_ui}" >
			    	
			      <v-card class="list-pack" :class="{'all_lightloader make_center': pack.open_ui}">
						<div class="pack-name text-xs-center">{{(pack.masterPackData) ? pack.masterPackData.label + ' #' + pack.id : ''}}</div>
						<div class="pack-card">
							 <img v-if="pack.masterPackData" :src="(pack.masterPackData.imageUrl) ? pack.masterPackData.imageUrl : require('@/assets/img/card_template.png')" />
						</div>
						<div class="pack-amount mt-3">
							<div class="pack-amount__button">
								<v-btn small class="btn-success ma-0" @click="openPack(pack)">
									<span v-if="!pack.open_ui">Open</span>
									<span v-else>
										<div class="dot-pulse"></div>
									</span>
								</v-btn>
							</div>
						</div>
						<div class="pack-info mt-3 mb-3" v-if="pack.masterPackData">
							<div v-tooltip.top="'Min '+pack.masterPackData.minimumPlayerAmount+' PLAYER'" class="pack-info__detail" v-if="pack.masterPackData.minimumPlayerAmount">
								<span class="detail-number">{{ pack.masterPackData.minimumPlayerAmount }}</span>
								<span class="detail-text"><span v-if="pack.masterPackData.minimumPlayerAmount.length > 1">PLAYERS</span><span v-else>PLAYER</span></span>
							</div>
							<div v-tooltip.top="'Min '+pack.masterPackData.minimumGoldAmount+' GOLD'" class="pack-info__detail" v-if="pack.masterPackData.minimumGoldAmount">
								<span class="detail-number">{{ pack.masterPackData.minimumGoldAmount }}</span>
								<span class="detail-text">GOLD</span>
							</div>
							<div v-tooltip.top="'Min '+pack.masterPackData.cardAmount+' ITEMS'" class="pack-info__detail" v-if="pack.masterPackData.cardAmount">
								<span class="detail-number">{{ pack.masterPackData.cardAmount }}</span>
								<span class="detail-text">ITEMS</span>
							</div>
						</div>
						<div class="pack-small-text mb-2">
							<span>MIN. GUARANTEES</span>
						</div>
					</v-card>
			    </slide>
			</carousel>
			<div v-else class="empty-content">
				You have no packs available, you can buy more <router-link :to="{ name: 'packs' }">here</router-link>
			</div>
		</v-container>
	</v-layout>
</template>
<script>
import vuetifyToast from 'vuetify-toast'

export default {
	name: 'MyPacks',
	components: {},
  props: {
    errorMessage: String,
  },
	data() {
		return {
			isOpeningPack: false
		}
	},
	created() {
		if (this.$store.getters.isLoggedIn) {
			this.$store.dispatch('packs/getMyPacks').then((response) => {}) // update store 
		}
	},
	computed: {
		packs: {
			get: function() {
				let getPacks = this.$store.getters['packs/getMyPacks']
				return getPacks
			},
			set: function(newValue) {
			 console.log(newValue)
			}
		}
	},
	methods: {
		openPack(pack) {
			if(!this.isOpeningPack) {
				this.isOpeningPack = true
				let uiPackPayload = { pack: pack, action: true }
      	this.$store.dispatch('packs/open', uiPackPayload)
				vuetifyToast.success('Opening pack is loading, Please wait..')
				this.$store.state.sideHide = true
				
				this.$store.dispatch('openpacks/getOpeningPack', pack.id)
					.then((response) => {
						if(response.status) {
              this.$store.dispatch('userdata/fetchNotifications')
							this.$emit('packOpened')
						} else {
							pack.opened = false
							vuetifyToast.success(response.message)
							this.$store.state.sideHide = false
						}
						this.$store.dispatch('packs/getMyPacks').then((response) => {})
					})
					.catch((error) => {
						uiPackPayload.action = false
      			this.$store.dispatch('packs/open', uiPackPayload)
						vuetifyToast.error(error.response.data.data)
						this.$store.state.sideHide = false;
					})


			}else {
				vuetifyToast.error('You can not open multiple packs one time, Please wait until opening current pack!')
			}
		}
	}
}
</script>
