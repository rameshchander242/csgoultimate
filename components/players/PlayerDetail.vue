<template>
  <v-layout>
   <v-container class="pack-container" fluid grid-list-md>
    <v-card :class="{lightloader: detail_loader}">
       <div class="text-xs-center">
        <div ref="root" class="player_block" v-bind:class="{ goldrare: true, csgo: true, small: isSmall }">
          <div class="player" style="position: relative;">
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
                  <span class="marquee" v-tooltip.top="'Player Name'"> {{cardDetails.playerName}} </span></div>
                <div class="attributes">
                    <span class="rifle" v-tooltip.left="'Rifle Score'">
                        {{cardDetails.rifleScore}} <span class="sub-attributes">rif</span>
                    </span>
                    <span class="awp" v-tooltip.left="'AWP Score'">
                        {{cardDetails.awpScore}} <span class="sub-attributes">awp</span>
                    </span>
                    <span class="clutch" v-tooltip.left="'Clutch Score'">
                         {{cardDetails.clutchScore}} <span class="sub-attributes">clu</span>
                    </span>
                    <span class="entry" v-tooltip.left="'Entry Score'">
                        {{cardDetails.entryScore}} <span class="sub-attributes">ent</span>
                    </span>
                    <span class="pistol" v-tooltip.left="'Pistol Score'">
                      {{cardDetails.pistolScore}} <span class="sub-attributes">pis</span>
                    </span>
                    <span class="iq" v-tooltip.left="'IQ Score'">
                        {{cardDetails.iqScore}} <span class="sub-attributes">iq</span>
                    </span>
                </div>
                 <div class="chemstyle">
                  <img v-tooltip.left="cardDetails.condition + ' '+ cardConditionValue(cardDetails.condition)" class="chemstyleimage" src="../../assets/img/playericon.png" alt="" style="height: 20px; margin-top: -5px;" /> 
                  <span v-tooltip.left="'Special'" class="chemstylename">{{cardDetails.mapLabel}}</span>
                </div>
            </div>
           </div>
          </div>
        <ul class="p_detials_list">
          <li>
            <b>Quick Sell</b>
            <span class="detail-action q_s_value" v-tooltip.top="'Quick Sell'"><button v-on:click="sell(cardDetails, 'quick')"><img src="../../assets/img/coinimg.png" alt="coin">{{cardDetails.quickSellValue}}</button></span>
          </li>
          <li>
            <b>Card Showcase</b> 
            <span class="detail-action">
             <router-link :to="{ path: 'share-card/' + encodeCode(cardDetails.id) }" class="btn" v-tooltip.top="'Show Card'">Open</router-link>
            </span>
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
            <span>
              <button class="withdraw-action" v-tooltip.top="'withdraw item'">
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
    components:{
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
      marketSale: Function
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
      sell(){
        let payload = {
          id: this.cardDetails.id,
          type: 'player',
        }
        this.$props.sellquickCard(payload)
      },
      saleonMarket(){
        let payload = {
          id: this.cardDetails.id,
          marketValue: this.marketprice,
          type: 'player',
        }
        this.$props.marketSale(payload)
        this.marketprice = '';
        this.listDialog = false
      },
      cancel(){
        this.marketprice = '';
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
