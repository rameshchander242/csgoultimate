<template>
  <v-layout>
   <v-container class="pack-container" fluid grid-list-md>
    <v-card :class="{lightloader: detail_loader}">
       <div class="grayBlock text-xs-center">
         <div ref="root" v-bind:class="{ card: true, goldrare: true, csgo: true, small: isSmall }">
            <div class="player" style="position: relative">
            <img :src="cardDetails.backgroundUrl" v-bind:alt="cardDetails.cardTypeName" class="player-card" />
             <img class="clubbadge" v-tooltip.left="cardDetails.teamName" ref="clubbadge" :src="cardDetails.teamLogo" alt="" />
          </div>
         </div>
        <ul class="p_detials_list">
          <li>
            <b>Quick Sell</b>
            <span class="q_s_value" v-tooltip.top="'Quick Sell'"><button v-on:click="sell(cardDetails)"><img src="../../assets/img/coinimg.png" alt="coin">{{cardDetails.quickSellValue}}</button></span>
          </li>
          <li>
            <b>Marketplace<small>Check Prices</small></b> 
            <span class="detail-action"><a href="javascript:void(0)" v-on:click="listDialog=true" class="btn" v-tooltip.top="'Marketplace'">List</a></span>
            <ModalBox 
            class="tos_modal  "
            title="Market Place"
            :show="listDialog"
            :maxWidth= "'400'"
            :actions="actions"
            >
              <v-layout wrap class="tos_popup">
                <v-flex xs12 >
                  <div class="input-group">
                    <span><img src="../../assets/img/coinimg.png" alt="coin"> &nbsp;</span>
                    <input type="number" class="form-control" name="marketprice" value="" v-model="marketprice" placeholder="0">
                </div>
                </v-flex>
              </v-layout>
            </ModalBox>
          </li>
          <li>
            <b>withdraw item</b> 
            <span v-tooltip.top="'withdraw item'">
              <button class="withdraw-action">
                <img src="../../assets/img/opskins.png" class="opskins" alt="coin">                
              </button>
            </span>
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
    sellquickCard: Function,
    marketSale: Function,
  },
  data() {
    return {
      marketprice: '',
      listDialog: false,
      actions: [{
          title: 'Sale on Market',  
          style: 'success',
          callback: this.saleonMarket
        },
        {
          title: 'Close',
          style: 'red',
          callback: this.cancel
      }],
    }
  },
  methods: {
    sell(card){
      let payload = {
        id: this.cardDetails.id, 
        type: 'boostMap',
      }
      this.$props.sellquickCard(payload)
    },
    saleonMarket(){
      let payload = {
        id: this.cardDetails.id, 
        marketValue: this.marketprice,
        type: 'boostMap',
      }
      this.$props.marketSale(payload)
      this.listDialog = false
    },
    cancel(){
      this.listDialog = false
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
