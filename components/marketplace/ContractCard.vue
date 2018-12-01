<template>
  <v-card>
    <div class="player_block" :class="{active: isActive}">
      <div class="player" style="position: relative;">
        <div v-if="data.userId == $store.state.authUser.id" class="player-box-user"><i class="fa fa-user-circle"></i></div>
        <div class="player-box-select"><img src="../../assets/img/select-symbol.png" alt="select player"></div>
        <img :src="data.backgroundUrl" v-bind:alt="data.cardTypeName" class="player-card" />
      </div>
      <div class="player_block_quicksell-main w_100">
          <div v-tooltip="'Quick Sell Value'" class="player_block_quicksell-col left-side">
              <img src="../../assets/img/coinimg.png" alt="coin">
              {{data.marketValue}}
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
    left: 6px;
    top: 15px;
}
</style>