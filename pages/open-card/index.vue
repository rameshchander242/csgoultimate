<template>
	<v-layout align-center id="open-pack-page" class="container">
		<v-flex>
			<v-btn icon dark v-on:click="goBack" @click.native="dialog = false">
				<v-icon>close</v-icon>
			</v-btn>
			<div class="right-icons pull-right">
				<v-btn v-on:click="skipAnimation" v-tooltip.left="'Skip Animation'">Skip &nbsp; <v-icon>fast_forward</v-icon></v-btn>
				<v-btn v-on:click="toggleSound" class='toggleSound' v-tooltip.left="'Mute Sound'">
					<v-icon>{{volumeText}}</v-icon>
				</v-btn>

			</div>

			<div class="pack-load" ref="root">
				<!-- {{openedPack}} -->
				<!-- <button v-on:click="startCelibration">Start</button> -->
				<CardBackground v-if="dataLoad" @done="onBGLoad" :class="goldCard.cardTypeName">
					<template slot="legend" v-if="goldCard && show">
						<PlayerCard 
							v-if="show && goldCard.indicator == 'players'" 
							:closed="true" 
							@start="onLoadStart" 
							@done="onLegendLoad" 
							:playerCard="goldCard" />
						<CoachCard 
							v-if="show && goldCard.indicator == 'coaches'" 
							:closed="true" 
							@start="onLoadStart" 
							@done="onLegendLoad" 
							
							:coachCard="goldCard" />
						<FitnessCard 
							v-if="show && goldCard.indicator == 'fitness'" 
							:closed="true" 
							@start="onLoadStart" 
							@done="onLegendLoad" 
							:fitnessCard="goldCard" />
						<ContractCard 
							v-if="show && goldCard.indicator == 'contract'" 
							:closed="true" 
							@start="onLoadStart" 
							@done="onLegendLoad" 
							:contractCard="goldCard" />
						<BoostMapCard 
							v-if="show && goldCard.indicator == 'boostMapCards'" 
							:closed="true" 
							@start="onLoadStart" 
							@done="onLegendLoad" 
							:boostmapCard="goldCard" />
						<BoostRoleCard 
							v-if="show && goldCard.indicator == 'boostRoleCards'" 
							:closed="true" 
							@start="onLoadStart" 
							@done="onLegendLoad" 
							:boostroleCard="goldCard" />
						<SwitchMapCard 
							v-if="show && goldCard.indicator == 'switchMapCards'" 
							:closed="true" 
							@start="onLoadStart" 
							@done="onLegendLoad" 
							:switchmapCard="goldCard" />
						<SwitchRoleCard 
							v-if="show && goldCard.indicator == 'switchRoleCards'" 
							:closed="true" 
							@start="onLoadStart" 
							@done="onLegendLoad" 
							:switchroleCard="goldCard" />
						<TeamBoostCard 
							v-if="show && goldCard.indicator == 'boostTeamCards'" 
							:closed="true" 
							@start="onLoadStart" 
							@done="onLegendLoad" 
							:teamboostCard="goldCard" />


					</template>
					<template slot="bottom" v-if="otherCards.length > 0">
						<CardList v-if="showBottom" @done="bottomLoad" v-bind:otherCards="otherCards" ></CardList>
					</template>

					<template slot="links" v-if="otherCards.length > 0 && showBottom">
				        <v-layout row wrap>
					      	<v-flex xs12 text-center>
					      		<div class="topbox">
						    		<v-btn v-on:click="go('my-items')" small >GO TO MY ITEMS</v-btn> | <v-btn v-on:click="go('my-packs')" small >GO TO MY PACKS</v-btn>
						      	</div>
						      	<div class="bottombox">
						    		<span></span>
						      	</div>
					      </v-flex>
					    </v-layout>
					</template>		

					<template v-if="!goldCard && otherCards.length == 0 " slot="legend">
						<v-flex xs12 sm6 offset-sm3>
							<v-card>
								<v-card-title
									class="headline grey lighten-1"
									primary-title
									>
									No Item Found!
								</v-card-title>
								<v-card-text>
									Best of luck next time!
								</v-card-text>
								<v-card-actions>
									<v-spacer></v-spacer>
									<v-btn v-on:click="goBack" color="primary" flat>
										Back
									</v-btn>
								</v-card-actions>
							</v-card>
						</v-flex>
					</template>
				</CardBackground>
				<v-layout v-if="found">
					<v-flex xs12 sm6 offset-sm3>
						<v-card>
							<v-card-title
								class="headline grey lighten-1"
								primary-title
								>
								No Pack Ready for Open
							</v-card-title>
							<v-card-text>
								Please cross check the My Pack and try again!
							</v-card-text>
							<v-card-actions>
								<v-spacer></v-spacer>
								<v-btn v-on:click="goBack" color="primary" flat>
									Back
								</v-btn>
							</v-card-actions>
						</v-card>
					</v-flex>
				</v-layout>
			</div>
		</v-flex>
	</v-layout>
</template>
<script>
import CardBackground from '@/components/packs/open/CardBackground'
import CardList from '@/components/packs/open/CardList'

import PlayerCard from '@/components/packs/open/PlayerCard'
import CoachCard from '@/components/packs/open/CoachCard'
import FitnessCard from '@/components/packs/open/FitnessCard'
import ContractCard from '@/components/packs/open/ContractCard'
import BoostMapCard from '@/components/packs/open/BoostMapCard'
import BoostRoleCard from '@/components/packs/open/BoostRoleCard'
import SwitchMapCard from '@/components/packs/open/SwitchMapCard'
import SwitchRoleCard from '@/components/packs/open/SwitchRoleCard'
import TeamBoostCard from '@/components/packs/open/TeamBoostCard'

export default {
	layout: 'full',
	components: {
		CardBackground,
		CardList,
		PlayerCard,
		CoachCard,
		FitnessCard,
		ContractCard,
		BoostMapCard,
		BoostRoleCard,
		SwitchMapCard,
		SwitchRoleCard,
		TeamBoostCard,
	},
	data() {
		return {
			dialog: false,
			found: false,
			show: false,
			showBottom: false,
			dataLoad: false,
			goldCard: {},
			otherCards: [],
			volumeText: 'volume_up',
			timestart: null,
			cardDetailsData:{},
			packImage: '',
			opencardBackground: '',
		}
	},
	destroyed: function() {
		// console.log('pack open destroyed')
	},
	mounted() {
		this.$store.state.sideHide = false;
		setTimeout(() => {
			this.loadCardOpening()
		}, 500)
	},
	computed: {
		openedPack() {
			this.$store.skipAnimation = false

			let getPack = this.$store.getters['openpacks/getOpenedPack']
			return getPack
		},
		mapList() {
			let getPack = this.$store.getters['openpacks/getMaps']
			return getPack
		}
	},
	methods: {
		goBack() {
			clearInterval(window.myinterval)
			this.$router.go(-1)
		},
		go(redirect_path){
			clearInterval(window.myinterval)
			this.$router.push({ path: redirect_path })
		},
		showOpenedItems() {
			this.dialog = true
		},
		onBGLoad() {
			this.show = true
		},
		onLoadStart() {
			if(this.$store.skipAnimation == true) return;

			window.mySoundObject.play();
			this.timestart = setTimeout(()=>{
				this.startCelibration()
			}, 6000)
		},
		toggleSound(){
			window.mySoundObject.toggleMute()
			this.volumeText = window.mySoundObject.muted?'volume_off':'volume_up';
		},
		skipAnimation(){
			if(this.$store.skipAnimation) return;
			this.$store.skipAnimation = true
			window.mySoundObject.stop();
			this.show = false
			this.showBottom = false
			setTimeout(()=>{ this.show = true	}, 1)
		},
		startCelibration() {
			if(this.$store.skipAnimation == true) return;
			var end = Date.now() + (1 * 100);
			var flowcolor = []
			switch(this.goldCard.cardTypeName) {
				case 'Gold' :
					flowcolor = ['#FFDF00']
					break
				case 'Bronze' :
					flowcolor = ['#CD7F32', '#A52A2A']
					break
				case 'Silver' :
					flowcolor = ['#C0C0C0']
					break
				default: 
					flowcolor = ['#ffffff']
			}
			
			let celebrate_angle = 0;
			for(var i=0; i<1; i++){
				function r(min, max, angle) {
					//return Math.random() * (max - min) + min;
					if(angle){
						if(celebrate_angle<min)
							celebrate_angle = max;
						else
							celebrate_angle -= 32;

						//console.log(celebrate_angle)
						return celebrate_angle
					}else{
						return Math.random() * (max - min) + min;
					}

				}

				confetti({
					angle: 90,
					spread: 180,
					particleCount: 300,
					startVelocity: 40,
					decay: 0.88,
					origin: {
						y: .4
					},
					colors: flowcolor
				});
				// confetti({
				// 	angle: r(50, 150, 1),
				// 	spread: r(50, 70),
				// 	particleCount: r(50, 100),
				// 	origin: {
				// 		y: .1
				// 	},
				// 	colors: flowcolor
				// });
			}
		},
		parsePlayer(indicator, card) {
			let player_info = {
				id: card.playersData.id,
				cardid: card.id,
				indicator: indicator,
				teamName: '',
				teamLogo:'',
				countryName: '',
				countryLogo: '',
				formLevel: card.formLevel,
				cardTypeName:'',
				backgroundUrl: '',
				pictureUrl: '',
				overallScore: 0,
				playerName: '',
				roleLabel: '',
				mapLabel: 'NUKE',
				rifleScore: 0,
				clutchScore: 0,
				pistolScore: 0,
				awpScore: 0,
				entryScore: 0,
				iqScore: 0,
				quickSellValue: 0,
				roleShortName: '',
				condition: 0,
			}

			// check value
			let playerCardData = card
			player_info.backgroundUrl = playerCardData.backgroundUrl
			player_info.overallScore = playerCardData.overallScore
			player_info.rifleScore = playerCardData.rifleScore
			player_info.clutchScore = playerCardData.clutchScore
			player_info.pistolScore = playerCardData.pistolScore
			player_info.awpScore = playerCardData.awpScore
			player_info.entryScore = playerCardData.entryScore
			player_info.iqScore = playerCardData.iqScore
			player_info.iqScore = playerCardData.iqScore

			if(playerCardData.rarityLevelsData) {
				player_info.quickSellValue = playerCardData.rarityLevelsData.quickSellValue
			}

			if(playerCardData.cardTypesData) {
				player_info.cardTypeName = playerCardData.cardTypesData.label
			}

			if(playerCardData.rolesData) {
				player_info.roleLabel = playerCardData.rolesData.label
				player_info.roleShortName = playerCardData.rolesData.shortName
			}

			if(playerCardData.playersData){
				let playersData = playerCardData.playersData
				player_info.pictureUrl = playersData.pictureUrl
				player_info.playerName = playersData.playerName

				if(playersData.teamData) {
					player_info.teamLogo = playersData.teamData.logoUrl
					player_info.teamName = playersData.teamData.teamName

				}

				if(playersData.countryData){
					player_info.countryName = playersData.countryData.countryName
					player_info.countryLogo = playersData.countryData.imageUrl
				}
			}
			
			if(card.mapLabel) {
				player_info.mapLabel = card.mapLabel
			}
			return player_info
		},
		parseCoach(indicator, card) {
			let coach_info = {
				cardid: card.id,
				indicator: indicator,
				teamName: '',
				teamLogo:'',
				countryName: '',
				countryLogo: '',
				formLevel: card.formLevel,
				cardTypeName:'',
				backgroundUrl: '',
				pictureUrl: '',
				overallScore: 0,
				playerName: '',
				roleLabel: '',
				mapLabel: 'NUKE',
				quickSellValue: 0,
				roleShortName: ''
			}

			// check value
			let playerCardData = card
			coach_info.backgroundUrl = playerCardData.backgroundUrl
			coach_info.overallScore = playerCardData.overallScore
			coach_info.boosterPercentage = playerCardData.boostPct

			if(playerCardData.rarityLevelsData) {
				coach_info.quickSellValue = playerCardData.rarityLevelsData.quickSellValue
			}

			if(playerCardData.boostMapCardsData) {
				coach_info.boostLabel = playerCardData.boostMapCardsData.mapsData.label
			}else if(playerCardData.boostRoleCardsData) {
				coach_info.boostLabel = playerCardData.boostRoleCardsData.rolesData.label
			}

			if(playerCardData.coachData){
				let coachData = playerCardData.coachData
				coach_info.pictureUrl = coachData.pictureUrl
				coach_info.coachName = coachData.coachName

				if(coachData.teamData) {
					coach_info.teamLogo = coachData.teamData.logoUrl
					coach_info.teamName = coachData.teamData.teamName
				}

				if(coachData.countryData){
					coach_info.countryName = coachData.countryData.countryName
					coach_info.countryLogo = coachData.countryData.imageUrl
				}
			}
			
			if(card.mapData) {
				coach_info.mapLabel = card.mapData.label
			}
			return coach_info
		},
		parseFitness(indicator, card) {
			let fitness_info = {
				indicator: indicator,
				quickSellValue: 0,
				additionAmount: card.additionAmount,
				backgroundUrl: card.image,
			}
			let fitnessCardData = card
			if(fitnessCardData.rarityLevelsData) {
				fitness_info.quickSellValue = fitnessCardData.rarityLevelsData.quickSellValue
			}

			if(fitnessCardData.cardTypesData) {
				fitness_info.cardTypeName = fitnessCardData.cardTypesData.label
			}
			return fitness_info
		},
		parseContract(indicator, card) {
			let contract_info = {
				indicator: indicator,
				quickSellValue: 0,
				additionAmount: card.additionAmount,
				backgroundUrl: card.image
			}
			let contractCardData = card

			if(contractCardData.cardTypesData) {
				contract_info.cardTypeName = contractCardData.cardTypesData.label
			}
			if(contractCardData.rarityLevelsData) {
				contract_info.quickSellValue = contractCardData.rarityLevelsData.quickSellValue
			}

			return contract_info
		},
		parseSwitchMap(indicator, card) {
			let switchmap_info = {
				indicator: indicator,
				quickSellValue: 0,
				overallScore: 0,
				backgroundUrl: card.image
			}
			let switchmapCardData = card
			if(switchmapCardData.cardTypesData) {
				switchmap_info.cardTypeName = switchmapCardData.cardTypesData.label
			}
			if(switchmapCardData.rarityLevelsData) {
				switchmap_info.quickSellValue = switchmapCardData.rarityLevelsData.quickSellValue
			}

			return switchmap_info
		},
		parseSwitchRole(indicator, card) {
			let switchrole_info = {
				indicator: indicator,
				quickSellValue: 0,
				overallScore: 0,
				backgroundUrl: card.image
			}
			let switchroleCardData = card
			if(switchroleCardData.cardTypesData) {
				switchrole_info.cardTypeName = switchroleCardData.cardTypesData.label
			}
			if(switchroleCardData.rarityLevelsData) {
				switchrole_info.quickSellValue = switchroleCardData.rarityLevelsData.quickSellValue
			}

			return switchrole_info
		},
		parseBoostMap(indicator, card) {
			let boostmap_info = {
				indicator: indicator,
				quickSellValue: 0,
				boostPct: card.boostPct,
				backgroundUrl: card.image
			}
			let boostmapCardData = card
			if(boostmapCardData.cardTypesData) {
				boostmap_info.cardTypeName = boostmapCardData.cardTypesData.label
			}
			if(boostmapCardData.rarityLevelsData) {
				boostmap_info.quickSellValue = boostmapCardData.rarityLevelsData.quickSellValue
			}

			return boostmap_info
		},
		parseBoostRole(indicator, card) {
			let boostrole_info = {
				indicator: indicator,
				quickSellValue: 0,
				boostPct: card.boostPct,
				backgroundUrl: card.image
			}
			let boostroleCardData = card
			if(boostroleCardData.cardTypesData) {
				boostrole_info.cardTypeName = boostroleCardData.cardTypesData.label
			}
			if(boostroleCardData.rarityLevelsData) {
				boostrole_info.quickSellValue = boostroleCardData.rarityLevelsData.quickSellValue
			}

			return boostrole_info
		},
		parseTeamBoost(indicator, card) {
			let teamboost_info = {
				cardid: card.id,
				indicator: indicator,
				quickSellValue: 0,
				overallScore: 0,
				backgroundUrl: card.image,
				teamName: card.teamData.teamName,
				boostPct1: card.boostPct1,
				boostPct2: card.boostPct2,
				boostPct3: card.boostPct3,
			}
			if(this.cardDetailsData)
				for(let i=1; i<4; i++){
					let tbcard = 'boost_card_type_'+card.id+'_'+i;
					if(this.cardDetailsData[tbcard])
					teamboost_info['boostPct'+i+'Label'] = this.cardDetailsData[tbcard].label
				}

			let teamboostCardData = card
			if(teamboostCardData.rarityLevelsData) {
				teamboost_info.quickSellValue = teamboostCardData.rarityLevelsData.quickSellValue
			}
			return teamboost_info
		},
		loadCardOpening() {
			let packdata = this.openedPack.cards
			this.cardDetailsData = this.openedPack.cardDetailsData
			let mapdata = this.mapList

			//console.log(packdata); return;
			// sort players
			if (packdata.length > 0 ) {
				soundManager.onready(() => {
					window.mySoundObject = soundManager.createSound({
						url: '/open.wav',
						volume: 100,
						// autoLoad: true,
						autoPlay: false,
						multiShot: false,
						multiShotEvents: false,
						whileloading: function() {
							// console.log('loading');
						},
					});
				});
				let UICards = []
				packdata.forEach((item) => {
					let verifyCard = {}
					if(item.packData){
						if(item.packData.masterPackData)
							this.$store.state.packImage = item.packData.masterPackData.imageUrl
					}

					// Player Card
					if(item.indicator == 'players') {
						item.card.mapLabel = this.mapsLabel(mapdata, item.mapId);
						verifyCard = this.parsePlayer(item.indicator, item.card)
						verifyCard.condition = item.condition
					} 
					// Coaches Card 
					else if(item.indicator == 'coaches'){
						verifyCard =  this.parseCoach(item.indicator, item.card)
					}
					// fitness Card 
					else if(item.indicator == 'fitness'){
						verifyCard =  this.parseFitness(item.indicator, item.card)
					}
					// Contracts Card 
					else if(item.indicator == 'contract'){
						verifyCard =  this.parseContract(item.indicator, item.card)
						//this.switchmapCards = this.$store['openpacks/parseContract']
					}
					// Switch Role Card 
					else if(item.indicator == 'switchRoleCards'){
						verifyCard =  this.parseSwitchRole(item.indicator, item.card)
					}
					// Switch Map Card 
					else if(item.indicator == 'switchMapCards'){
						verifyCard =  this.parseSwitchMap(item.indicator, item.card)
					}
					// Switch Role Card 
					else if(item.indicator == 'boostMapCards'){
						verifyCard =  this.parseBoostMap(item.indicator, item.card)
					}
					// Switch Map Card 
					else if(item.indicator == 'boostRoleCards'){
						verifyCard =  this.parseBoostRole(item.indicator, item.card)
					}
					// Team BOost Card 
					else if(item.indicator == 'boostTeamCards'){
						verifyCard =  this.parseTeamBoost(item.indicator, item.card)
					}

					if(!this._.isEmpty(verifyCard)){
						UICards.push(verifyCard)						
					}
				})
				function cardSort(a){
					let attr = '';
					return (a.overallScore?a.overallScore:(
						a.additionAmount?a.additionAmount:(
							a.boostPct?a.boostPct:(
								a.boostPct1?(a.boostPct1+a.boostPct2+a.boostPct3):0
							))
						)
					)
				}
				
				let UICards1 = UICards
				UICards.sort(function(a, b) {
					return cardSort(b) - cardSort(a);
				})

				this.goldCard = UICards[0]
				this.opencardBackground = this.goldCard.mapLabel;
				document.getElementById('open-pack-page').style.backgroundImage = "url('/openpackbg/"+(this.opencardBackground.toLowerCase())+"bg.jpg')";

				UICards.shift()
				this.otherCards = UICards.sort( function(){ return .5 - Math.random(); } );

				// console.log('Other cards ---> ', this.otherCards)
				// window.mySoundObject.play();
				// window.mySoundObject.play({volume:100});
				this.dataLoad = true
				// window.mySoundObject.play({volume:100});
			} else {
				this.found = true
			}
		},
		mapsLabel(mdata, id){
			var lbll = '';
			mdata.forEach(function(val){
				if(val.id == id){
					lbll = val.label;
				}
			});
			return lbll;
		},
		onLegendLoad() {
			// console.log("legend done")
			this.showBottom = true
		},
		bottomLoad() {
			// console.log("bottom load")
		}
	}
}
</script>

<style lang="scss" scope>
.player {
	z-index: 9999;
}
#open-pack-page{ 
	max-width:100%; 
  background-size: cover;
  background-position: center; 
}
#open-pack-page button.v-btn.v-btn--icon.theme--dark {
	top: 0px;
	position: fixed;
}
.flex.xs12.center{
    margin-left: 40%;
}
</style>

