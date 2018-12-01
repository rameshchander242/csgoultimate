<template>
	<v-card>
		<div class="player_block" :class="{active: isActive}">
			<div class="player" style="position: relative;">
				<div v-if="data.userId == $store.state.authUser.id" class="player-box-user"><i class="fa fa-user-circle"></i></div>
				<div class="player-box-select"><img src="../../assets/img/select-symbol.png" alt="select player"></div>
				<img :src="data.backgroundUrl" v-bind:alt="data.cardTypeName" class="player-card" />
				<div class="player_details_main">
						<div class="player_details-top">
							<div class="player-left-top">
								<div class="ratingholder">
									 <span v-tooltip.left="'Over All Score'" class="rating" ref="rating"> {{data.overallScore}} </span>
								</div>
								<img class="clubbadge" v-tooltip.left="data.teamName" ref="clubbadge" :src="data.teamLogo" alt="" />
								<img  v-tooltip.left="data.countryName" class="nationflag" ref="nationflag" :src="data.countryLogo" alt="" />
							</div>
							<div class="avatarholder">
								<img ref="avatar" :src="data.pictureUrl" v-bind:alt="data.playerName" class="avatar" />
							</div>
						</div>
						<div class="name">
							<span class="marquee" v-tooltip.top="'Player Name'"> {{data.playerName}} </span></div>
						<div class="attributes">
								<span class="rifle" v-tooltip.left="'Rifle Score'">
										{{data.rifleScore}} <span class="sub-attributes">rif</span>
								</span>
								<span class="awp" v-tooltip.left="'AWP Score'">
										{{data.awpScore}} <span class="sub-attributes">awp</span>
								</span>
								<span class="clutch" v-tooltip.left="'Clutch Score'">
										 {{data.clutchScore}} <span class="sub-attributes">clu</span>
								</span>
								<span class="entry" v-tooltip.left="'Entry Score'">
										{{data.entryScore}} <span class="sub-attributes">ent</span>
								</span>
								<span class="pistol" v-tooltip.left="'Pistol Score'">
									{{data.pistolScore}} <span class="sub-attributes">pis</span>
								</span>
								<span class="iq" v-tooltip.left="'IQ Score'">
										{{data.iqScore}} <span class="sub-attributes">iq</span>
								</span>
						</div>
						 <div class="chemstyle">
							<img v-tooltip.left="data.condition + ' '+ cardConditionValue(data.condition)" class="chemstyleimage" src="../../assets/img/playericon.png" alt="" style="height: 20px; margin-top: -5px;" /> 
							<span v-tooltip.left="'Special'" class="chemstylename">{{data.mapLabel}}</span>
						</div>
				</div>
			</div>
			<div class="player_block_quicksell-main">
					<div v-tooltip="'Market Price'" class="player_block_quicksell-col left-side">
						<img src="../../assets/img/coinimg.png" alt="coin">
						{{data.marketValue}}
					</div>
					<div class="player_block_quicksell-col right-side">
						<div class="p_fitness_level">
							<span v-tooltip="'Fitness Level'" v-for="n in 5" :style="{background: (n < data.formLevel) ? '#65a429' : ''}"></span>
						</div>
					</div>
			</div>
		</div>
	</v-card>
</template>
<script>
	export default {
		props:{
			data: {
				type: Object
			},
			isActive: {
				type: Boolean,
				default: false
			},
			openDetails: Function,
		},
		data(){
			return {
				checkCard:null
			}
		},
		mutations:{

		},
		methods: {
			// OLD functionality
			open(player) {
				this.$props.openDetails(player)
			},
		}
	}
</script>

<style>
</style>
