<template>
	<v-layout align-center justify-center row fill-height id="open-pack-page">
		<v-flex xs12 sm6>
		 	<v-card>
	 		<v-toolbar  dark>
		 		<v-btn icon dark v-on:click="goBack">
					<v-icon>close</v-icon>
				</v-btn>
			</v-toolbar>
	        <v-card-text>
	        	<v-flex xs12 align-center justify-center row fill-height>
	        		<h2>Gabriel '{{playerCard.playerName}}' Toledo</h2>
	        	</v-flex>
		        <CardBackground >
					<template slot="legend">
						<PlayerCard
							:playerCard="playerCard" 
							:directShow="true"/>
					</template>
				</CardBackground>
	        </v-card-text>
	        <v-divider></v-divider>
	        <v-card-actions>
	         <v-flex xs12 sm7 align-end justify-center row fill-height>
				 <v-spacer></v-spacer>

				<!--   <v-speed-dial
			      v-model="fab"
			      :top="top"
			      :bottom="bottom"
			      :right="right"
			      :left="left"
			      :direction="direction"
			      :open-on-hover="hover"
			      :transition="transition"
			    >
			      <v-btn
			        slot="activator"
			        v-model="fab"
			        color="blue darken-2"
			        dark
			        fab
			      >
			        <v-icon>share</v-icon>
			        <v-icon>close</v-icon>
			      </v-btn>
			      <v-btn
			        fab
			        dark
			        small
			        color="green"
			      >
			        <v-icon>edit</v-icon>
			      </v-btn>
			      <v-btn
			        fab
			        dark
			        small
			        color="indigo"
			      >
			        <v-icon>add</v-icon>
			      </v-btn>
			      <v-btn
			        fab
			        dark
			        small
			        color="red"
			      >
			        <v-icon>delete</v-icon>
			      </v-btn>
			    </v-speed-dial> -->

		          <v-btn icon>
		            <v-icon>favorite</v-icon>
		          </v-btn>
		          <v-btn icon>
		            <v-icon>share</v-icon>
		          </v-btn>
			</v-flex>
	        </v-card-actions>
	      </v-card>
		</v-flex>

	</v-layout>
</template>

<script>
import CardBackground from '@/components/packs/open/CardBackground'
import PlayerCard from '@/components/packs/open/PlayerCard'

export default {
	layout: 'full',
	components: {  
		CardBackground,
		PlayerCard,
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

			playerCard: {
				awpScore: "64",
				backgroundUrl:"http://cdn.csgoultimate.gg/images/csgoultimateimage-1501636182881.png",
				cardTypeName:"Gold",
				clutchScore:"82",
				countryLogo:"http://cdn.csgoultimate.gg/images/csgoultimateimage-1501496591918.jpg",
				countryName:"Denmark",
				entryScore:"89",
				fitnessLevel:80,
				indicator:"players",
				iqScore:"84",
				mapLabel:"NUKE",
				overallScore:"87",
				pictureUrl:"http://cdn.csgoultimate.gg/images/csgoultimateimage-1502087994231.png",
				pistolScore:"89",
				playerName:"Kjaerbye",
				quickSellValue:7500,
				rifleScore:"87",
				roleLabel:"Rifle",
				roleShortName:"RIF",
				teamLogo:"http://cdn.csgoultimate.gg/images/csgoultimateimage-1501496657301.png",
				teamName:"Astralis"
			}
		}
	},
	methods: {
		goBack() {
			this.$router.go(-1)
		},
	}
}
</script>

<style>
</style>