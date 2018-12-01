<template>
  <v-card class='coach'>
    <div class="player_block" :class="{active: isActive}">
      <div class="player" style="position: relative;">
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
             <!-- <span ref="position" class="position">
              {{data.roleShortName}}
            </span>
             --><div class="name">
              <span ref="marquee" class="marquee" v-tooltip.top="'Coach Name'">
                {{data.coachName}}
              </span>
            </div>
            <div class="attributes" ref="attributes">
                <span class="boost" v-tooltip.top="'Boost'">
                  {{data.boosterPercentage}}% {{data.boostLabel}}
                </span>
            </div>
        </div>
      </div>
      <div class="player_block_quicksell-main">
          <div v-tooltip="'Quick Sell Value'" class="player_block_quicksell-col left-side">
              <img src="../../assets/img/coinimg.png" alt="coin">
              {{data.quickSellValue}}
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
      }
    },
    methods: {
     
    }

  }
</script>

<style lang="scss" scoped>
span.boost {
    left: 5px;
    top: 17px;
}
</style>


