<template>
  <v-layout>
   <v-container class="pack-container coach" fluid grid-list-md>
    <v-card :class="{lightloader: detail_loader}">
       <div class="text-xs-center">
         <div ref="root" class="player_block" v-bind:class="{ goldrare: true, csgo: true, small: isSmall }">
            <div class="player" style="position: relative;">
              <div class="player-box-select"><img src="../../assets/img/select-symbol.png" alt="select player"></div>
              <img :src="cardDetails.backgroundUrl" v-bind:alt="cardDetails.cardTypeName" class="player-card" />
              <div class="player_details_main">
                <div class="player_details-top">
                    <div class="player-left-top">
                        <div class="ratingholder">
                           <span v-tooltip.left="'Over All Score'" class="rating" ref="rating"> {{cardDetails.overallScore}} </span>
                        </div>
                        <img class="clubbadge" v-tooltip.left="cardDetails.teamName" ref="clubbadge" :src="cardDetails.teamLogo" alt="" />
                        <img  v-tooltip.left="cardDetails.countryName" class="nationflag" ref="nationflag" :src="cardDetails.countryLogo" alt="" />
                    </div>
                    <div class="avatarholder">
                    <img ref="avatar" :src="cardDetails.pictureUrl" v-bind:alt="cardDetails.playerName" class="avatar" />
                  </div>
                </div>
                 <div class="name">
                  <span ref="marquee" class="marquee" v-tooltip.top="'Coach Name'">
                    {{cardDetails.coachName}}
                  </span>
                </div>
                <div class="attributes" ref="attributes">
                    <span class="boost" v-tooltip.top="'Boost'">
                      {{cardDetails.boosterPercentage}}% {{cardDetails.boostLabel}}
                    </span>
                </div>
              </div>
            </div>
         </div>
        <ul class="p_detials_list">
          <li>
            <b>Price</b>
            <span class="detail-action market_value" v-tooltip.top="'Price'"><button><img src="../../assets/img/coinimg.png" alt="coin"> &nbsp;{{cardDetails.marketValue}}</button></span>
          </li>
          <!-- <li>
            <b>Card Showcase</b> 
            <span class="detail-action">
             <router-link :to="{ path: 'share-card/' + encodeCode(cardDetails.userCoachCardId) }" class="btn" v-tooltip.top="'Show Card'">Open</router-link>
            </span>
          </li> -->
          <li v-if="cardDetails.userId == $store.state.authUser.id">
            <b>Marketplace</b> 
            <span>
              <button class="btn" v-on:click="listDialog_=true" v-tooltip.top="'Remove From Marketplace'">
                REMOVE              
              </button>
            </span>
            <ModalBox 
            class="tos_modal"
            title="Remove From Market Place"
            :show="listDialog_"
            :maxWidth= "'400'"
            :actions="actions_"
            >
              <v-layout wrap class="tos_popup">
                <v-flex xs12 >
                  <b>Market Value: </b> &nbsp; &nbsp; &nbsp;
                  <span class="detail-action q_s_value" v-tooltip.top="'Market Value'"><button><img src="../../assets/img/coinimg.png" alt="coin">{{cardDetails.marketValue}}</button></span>
                </v-flex>
              </v-layout>
            </ModalBox>
          </li>
          <li v-else>
            <b>Buy item</b> 
            <span class="detail-action q_s_value text-center btn" v-tooltip.top="'Buy item'" v-on:click="listDialog=true">BUY</button></span>
            <ModalBox 
            class="tos_modal"
            title="Buy From Market Place"
            :show="listDialog"
            :maxWidth= "'400'"
            :actions="actions"
            >
              <v-layout wrap class="tos_popup">
                <v-flex xs12 >
                  <b>Market Value: </b> &nbsp; &nbsp; &nbsp;
                  <span class="detail-action q_s_value" v-tooltip.top="'Market Value'"><button><img src="../../assets/img/coinimg.png" alt="coin">{{cardDetails.marketValue}}</button></span>
                </v-flex>
              </v-layout>
            </ModalBox>
          </li>
        </ul> 
      </div>
    </v-card>
  </v-container>
</v-layout>
</template>
<script>
import vuetifyToast from 'vuetify-toast'
import ModalBox from '~/components/helpers/ModalBox'

export default {
  components: {
    ModalBox
  },
  props: {
    cardDetails: Object,
    detail_loader: {
      type: Boolean,
      default: false
    },
    isSmall: {
      type: Boolean,
      default: false
    },
    marketBuy: Function,
    marketRemove: Function,
  },
  data() {
    return {
      listDialog: false,
      actions: [{
          title: 'Buy Item',  
          style: 'success',
          callback: this.buyItem
        },
        {
          title: 'Close',
          style: 'red',
          callback: this.cancel
      }],
      listDialog_: false,
      actions_: [{
          title: 'Remove Marketplace',  
          style: 'success',
          callback: this.removeItem
        },
        {
          title: 'Close',
          style: 'red',
          callback: this.cancel
      }],
    }
  },
  methods: {
    cancel(){
      this.listDialog = false
      this.listDialog_ = false
    },
    buyItem(){
      this.$props.marketBuy({id: this.cardDetails.id, CardId: this.cardDetails.playerCardId, userCardId: this.cardDetails.userPlayerCardId, price: this.cardDetails.marketValue}, 'coach')
      this.listDialog = false
    },
    removeItem(){
      this.$props.marketRemove({id: this.cardDetails.id, CardId: this.cardDetails.playerCardId, userCardId: this.cardDetails.userPlayerCardId, price: this.cardDetails.marketValue}, 'coach')
      this.listDialog_ = false
    },
  }
}
</script>

<style scoped>
.card{
 background-color: #fff0;
}
.card.csgo {
  max-width: unset;
}
.card.csgo.goldrare {
  display: block;
  border: 0;
}
.card.goldrare.csgo .player {
    display: inline-block;
}
#app-content .pack-container .v-card {
  border: unset;
}
</style>
