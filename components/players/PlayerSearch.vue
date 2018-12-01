<template>
	<div class="mt-5">
		<v-layout class="mb-5">
			<v-flex xs12>
				<div>
					<!-- <v-autocomplete class="player-search"
													v-model="selectedPlayer"
													:items="playerCards"
													:loading="isLoading"
													:search-input.sync="search"
													chips
													clearable
													hide-details
													hide-selected
													item-text="player.playerName"
													item-value="position"
													label="Search for a player..."
													solo
													return-object>
						<template slot="no-data">
							<v-list-tile>
								<v-list-tile-title>
									Search for your favorite
									<strong>player</strong>
								</v-list-tile-title>
							</v-list-tile>
						</template>
						<template slot="selection" slot-scope="{ item, selected }">
							<v-chip :selected="selected" color="blue-grey" class="white--text">
								<v-icon left>mdi-coin</v-icon>
								<span v-text="item.player.playerName"></span>
							</v-chip>
						</template>
						<template slot="item"
											slot-scope="{ item, tile }">
							<v-list-tile-content style="max-width: 47px; position: relative">
								<img :src="item.backgroundUrl" width="32" />
								<span class="player-score">{{item.overallScore}}</span>
							</v-list-tile-content>
							<v-list-tile-avatar style="width: 60px">
								<img :src="item.player.pictureUrl" />
							</v-list-tile-avatar>
							<v-list-tile-content style="max-width: 47px">
								<img :src="item.player.team.logoUrl" width="24" style="margin-bottom: 7px" />
								<img :src="item.player.country.imageUrl" width="24" />
							</v-list-tile-content>
							<v-list-tile-content>
								<v-list-tile-title v-text="item.player.playerName"></v-list-tile-title>
								<v-list-tile-sub-title><span class="role">{{item.role.shortName}}</span> - {{item.cardType.label}}</v-list-tile-sub-title>
							</v-list-tile-content>
							<v-list-tile-action>
								<v-icon>mdi-coin</v-icon>
							</v-list-tile-action>
						</template>
					</v-autocomplete> -->
				</div>
			</v-flex>
		</v-layout>
		<v-layout>
			<v-flex xs12>
				<div class="text-center">
					<div v-if="selectedPlayer != null">
						<player-card :selectedPlayer="selectedPlayer"></player-card>
					</div>
					<div v-else>
						<img src="../../assets/img/card_template.png" />
					</div>
				</div>
			</v-flex>
		</v-layout>
		<v-layout style="margin-top: 70px" v-if="selectedPlayer != null">
			<v-flex xs12>
				<div style="text-align: center">
					<router-link :to="{ name: 'PresentPlayerCard', params: { id: selectedPlayer.id }}">Copy link to this card</router-link>
				</div>
			</v-flex>
		</v-layout>
	</div>
</template>

<script>
	import PlayerCard from './PlayerCard'

export default {
	  name: 'PlayerSearch',
	  components: {
	    PlayerCard
	  },
	  data: () => ({
	    selectedPlayer: null,
	    search: null,
	    player: {}
	  }),
	  created () {

	  },
	  computed: {
	    isLoading () {
	      return this.$store.getters.GET_ISLOADING
	    },
	    playerCards () {
	      let getPlayerCards = this.$store.getters.GET_PLAYER_CARDS
	      return getPlayerCards
	    }
	  },
	  methods: {

	  },
	  watch: {
	    search (val) {
	      if (this.playerCards.length > 0) return
	      this.$store.dispatch('LOAD_PLAYER_CARDS')
	    }
	  }
	}
</script>

<style>
	.v-autocomplete__content {
		top: 46px !important;
		left: -12px !important;
		background-color: #FFFFFF;
	}

	.player-search {
		background-color: #FFF;
		width: 400px;
		margin: 0 auto !important;
	}

		.player-search .v-list {
			padding: 0;
		}

			.player-search .v-list > div {
				padding: 12px 0;
			}

				.player-search .v-list > div:nth-child(even) {
					background-color: #f5f5f5;
				}

	.v-list__tile__avatar {
		justify-content: flex-start !important;
	}

		.v-list__tile__avatar .v-avatar {
			width: 46px !important;
			height: 46px !important;
		}

	.v-list__tile__sub-title {
		font-size: 13px;
	}

		.v-list__tile__sub-title span.role {
			font-weight: bold;
		}

	.player-score {
		position: absolute;
		left: 0;
		top: 0;
		position: absolute;
		left: 6px;
		top: 13px;
		font-weight: bold;
		color: #FFF;
		text-shadow: 1px 2px 5px #444444;
	}
</style>
