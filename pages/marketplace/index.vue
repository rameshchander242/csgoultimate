<template>
	<div id="marketplace">
		<v-tabs slot="extension" color="dark" v-model="tabs" show-arrows grow>
			<v-tabs-slider color="go-green"></v-tabs-slider>
			<v-tab v-for="card_type in cardTypes" :key="card_type.card" v-on:click="fetchMarketplace(card_type.card)" :href="'#'+card_type.card+'Tab'">
				{{card_type.title}} 
				<!-- <sup class="badge badge-default">{{countList[card_type.card+'Count']}}</sup> -->
			</v-tab>
			<!-- <v-tab v-on:click="fetchMarketplace('player')" href="#players">
				PLAYERS <sup class="badge badge-default">{{countList.playerCount}}</sup>
			</v-tab>
			<v-tab v-on:click="fetchMarketplace('coach')" href="#coaches">
				COACHES	<sup class="badge badge-default">{{countList.coachCount}}</sup>
			</v-tab>
			<v-tab v-on:click="fetchMarketplace('fitness')" href="#fitness">
				Fitness <sup clickass="badge badge-default">{{countList.fitnessCount}}</sup>
			</v-tab>
			<v-tab v-on:click="fetchMarketplace('contract')" href="#contracts">
				CONTRACTS	<sup class="badge badge-default">{{countList.contractCount}}</sup>
			</v-tab>
			<v-tab v-on:click="fetchMarketplace('boostMap')" href="#boostmaps">
				BOOST Maps <sup class="badge badge-default">{{countList.boostMapCount}}</sup>
			</v-tab>
			<v-tab v-on:click="fetchMarketplace('boostRole')" href="#boostroles">
				Boost Roles <sup class="badge badge-default">{{countList.boostRoleCount}}</sup>
			</v-tab>
			<v-tab v-on:click="fetchMarketplace('switchMap')" href="#switchmaps">
				Switch Maps <sup class="badge badge-default">{{countList.switchMapCount}}</sup>
			</v-tab>
			<v-tab v-on:click="fetchMarketplace('switchRole')" href="#switchroles">
				Switch Roles <sup class="badge badge-default">{{countList.switchRoleCount}}</sup>
			</v-tab>
			<v-tab v-on:click="fetchMarketplace('boostTeam')" href="#teamboosts">
				Team Boosts <sup class="badge badge-default">{{countList.boostTeamCount}}</sup>
			</v-tab> -->
		</v-tabs>
		<v-tabs-items v-model="tabs" touchless>
			<v-tab-item v-for="card_type in cardTypes" :key="card_type.card" :value="card_type.card+'Tab'">
				<Marketplace :ref="card_type.card" :cardType="card_type.card" :cardTypes="cardTypes" />
			</v-tab-item>
			<!--<v-tab-item :id="'coaches'" :type="'coach'">
				<Marketplace ref="coach"/>
			</v-tab-item>
			<v-tab-item id="fitness">
				<Marketplace ref="marketplace"/>
			</v-tab-item>
			<v-tab-item :id="'contracts'">
				<Marketplace ref="marketplace"/>
			</v-tab-item>
			<v-tab-item id="boostmaps">
				<Marketplace ref="marketplace"/>
			</v-tab-item>
			<v-tab-item id="boostroles">
				<Marketplace ref="marketplace"/>
			</v-tab-item>
			<v-tab-item id="switchmaps">
				<Marketplace ref="marketplace"/>
			</v-tab-item>
			<v-tab-item id="switchroles">
				<Marketplace ref="marketplace"/>
			</v-tab-item>
			<v-tab-item id="teamboosts">
				<Marketplace ref="marketplace"/>
			</v-tab-item> -->
		</v-tabs-items>
	</div>
</template>

<script>
import vuetifyToast from 'vuetify-toast'

import Marketplace from '@/components/Marketplace'
export default {
	middleware: 'auth',
	components: {
		Marketplace,
	},
	data () {
		return {
      tabs: null,
      cardTypes: [
      	{'card':'player', 'title':'Players'},
      	{'card':'coach', 'title':'Coaches'},
      	{'card':'fitness', 'title':'Fitness'},
      	{'card':'contract', 'title':'Contracts'},
      	{'card':'boostMap', 'title':'Boost Maps'},
      	{'card':'boostRole', 'title':'Boost Roles'},
      	{'card':'switchMap', 'title':'Switch Maps'},
      	{'card':'switchRole', 'title':'Switch Roles'},
      	{'card':'boostTeam', 'title':'Boost Teams'},
      ],

		}
	},
	mounted() {
		this.fetchMarketplace('player')
	},
	computed: {
		countList(){
			return this.$store.state.countList;
		}
	},
	methods: {
		fetchMarketplace(type) {
			//console.log(this.$refs[type]);
			this.$refs[type][0].fetchMarketPlace(type)
		},
	}
}
</script>

<style lang="scss" scoped>
</style>
