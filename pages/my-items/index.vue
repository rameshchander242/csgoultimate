<template>
	<div class="my-items">
		<v-tabs
			slot="extension"
			color="dark"
			v-model="tabs"
			show-arrows
			grow>
			<v-tabs-slider color="go-green"></v-tabs-slider>
			<v-tab v-on:click="fetchPlayers" href="#players">
				PLAYERS <sup class="badge badge-default">{{countList.playerCount}}</sup>
			</v-tab>
			<v-tab v-on:click="fetchCoaches" href="#coaches">
				COACHES	<sup class="badge badge-default">{{countList.coachCount}}</sup>
			</v-tab>
			<v-tab v-on:click="fetchFitness" href="#fitness">
				Fitness <sup class="badge badge-default">{{countList.fitnessCount}}</sup>
			</v-tab>
			<v-tab v-on:click="fetchContracts" href="#contracts">
				CONTRACTS	<sup class="badge badge-default">{{countList.contractCount}}</sup>
			</v-tab>
			<v-tab v-on:click="fetchBoostMaps" href="#boostmaps">
				BOOST Maps <sup class="badge badge-default">{{countList.boostMapCount}}</sup>
			</v-tab>
			<v-tab v-on:click="fetchBoostRoles" href="#boostroles">
				Boost Roles <sup class="badge badge-default">{{countList.boostRoleCount}}</sup>
			</v-tab>
			<v-tab v-on:click="fetchSwitchMaps" href="#switchmaps">
				Switch Maps <sup class="badge badge-default">{{countList.switchMapCount}}</sup>
			</v-tab>
			<v-tab v-on:click="fetchSwitchRoles" href="#switchroles">
				Switch Roles <sup class="badge badge-default">{{countList.switchRoleCount}}</sup>
			</v-tab>
			<v-tab v-on:click="fetchTeamBoosts" href="#teamboosts">
				Team Boosts <sup class="badge badge-default">{{countList.boostTeamCount}}</sup>
			</v-tab>
		</v-tabs>
		<v-tabs-items v-model="tabs" touchless>
			<v-tab-item :value="'players'">
				<Players ref="players"/>
			</v-tab-item>
			<v-tab-item :value="'coaches'">
				<Coaches ref="coaches"/>
			</v-tab-item>
			<v-tab-item value="fitness">
				<Fitness ref="fitness"/>
			</v-tab-item>
			<v-tab-item :value="'contracts'">
				<Contracts ref="contracts"/>
			</v-tab-item>
			<v-tab-item value="boostmaps">
				<BoostMaps ref="boostmaps"/>
			</v-tab-item>
			<v-tab-item value="boostroles">
				<BoostRoles ref="boostroles"/>
			</v-tab-item>
			<v-tab-item value="switchmaps">
				<SwitchMaps ref="switchmaps"/>
			</v-tab-item>
			<v-tab-item value="switchroles">
				<SwitchRoles ref="switchroles"/>
			</v-tab-item>
			<v-tab-item value="teamboosts">
				<TeamBoosts ref="teamboosts"/>
			</v-tab-item>
		</v-tabs-items>
	</div>
</template>

<script>
import vuetifyToast from 'vuetify-toast'

import Players from '@/components/Players'
import Coaches from '@/components/Coaches'
import Contracts from '@/components/Contracts'
import Fitness from '@/components/Fitness'
import BoostMaps from '@/components/BoostMaps'
import BoostRoles from '@/components/BoostRoles'
import SwitchMaps from '@/components/SwitchMaps'
import SwitchRoles from '@/components/SwitchRoles'
import TeamBoosts from '@/components/TeamBoosts'


export default {
	middleware: 'auth',
	components: {
		Players,
		Coaches,
		Contracts,
		Fitness,
		BoostMaps,
		BoostRoles,
		SwitchMaps,
		SwitchRoles,
		TeamBoosts,
	},
	data () {
		return {
      tabs: null,
			coach_details: {},
			coachCards: [],
			fitness_details: {},
			fitnessCards: [],
			contract_details: {},
			contractCards: [],
		}
	},
	mounted() {
		this.fetchPlayers()
		this.fetchCountList()
	},
	computed: {
		countList(){
			return this.$store.state.countList;
		}
	},
	methods: {
		fetchPlayers() {
			this.$store.quickSellDisable = false
			this.$refs.players.fetchItemPlayers()
		},
		fetchCoaches() {
			this.$store.quickSellDisable = false
			this.$refs.coaches.fetchItemCoaches()
		},
		fetchFitness() {
			this.$store.quickSellDisable = false
			this.$refs.fitness.fetchItemFitness()
		},
		fetchContracts() {
			this.$store.quickSellDisable = false
			this.$refs.contracts.fetchItemContracts()
		},
		fetchBoostMaps() {
			this.$store.quickSellDisable = false
			this.$refs.boostmaps.fetchItemBoostMaps()
		},
		fetchBoostRoles() {
			this.$store.quickSellDisable = false
			this.$refs.boostroles.fetchItemBoostRoles()
		},
		fetchSwitchMaps() {
			this.$store.quickSellDisable = false
			this.$refs.switchmaps.fetchItemSwitchMaps()
		},
		fetchSwitchRoles() {
			this.$store.quickSellDisable = false
			this.$refs.switchroles.fetchItemSwitchRoles()
		},
		fetchTeamBoosts() {
			this.$store.quickSellDisable = false
			this.$refs.teamboosts.fetchItemTeamBoosts()
		},
		fetchCountList(){
			this.$store.dispatch('getCardCountList');
		}
	}
}
</script>

<style lang="scss" scoped>
sup.badge{ min-width:24px; min-height:1px; display: inline-block; }
a:hover sup.badge{ text-decoration:none; }
</style>
