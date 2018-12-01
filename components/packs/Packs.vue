<template>
  <v-layout class="tab-layout">
    <v-container class="pack-container" fluid grid-list-md>
      <carousel v-if="masterPacks && masterPacks.length > 0" :perPageCustom="[[0, 1], [539, 2], [ 980, 3], [  1319, 4]]" :paginationEnabled="false" :navigationEnabled="true" :navigationClickTargetSize="5">
        <slide class="slide-item" v-for="(pack, index) in masterPacks" :key="index">

          <v-card class="list-pack position-relative">
            <site-loader v-if="!pack.cardTypeId" :darkBackground="true" :fullWidth="true" :autoHeight="true"></site-loader>
            <div class="corner-ribbon" v-if="pack.discountActive && pack.discountText!=''">
                <span :style="{ background: pack.discountColor }">{{pack.discountText}}</span>
            </div>
            <div class="pack-name text-xs-center">{{pack.label}}</div>
            <div class="pack-card">
              <img :src="(pack.imageUrl) ? pack.imageUrl : require('@/assets/img/card_template.png')" />
            </div>
            <div class="pack-prices">
              <div v-if="pack.coinPrice > 0" class="pack-prices__item coins text-right" v-on:click="use(pack,'coins')" :class="{selected : pack.use_coin, w_100:pack.pointPrice <= 0}" >
                <img src="../../assets/img/coin30.png" />
                <span>{{ pack.coinPrice }}</span>
              </div>
              <div v-if="pack.pointPrice > 0" class="pack-prices__item points text-left" v-on:click="use(pack, 'points')"  :class="{selected : pack.use_point, 'w_100 text-center':pack.coinPrice <= 0}">
                <span>{{ pack.pointPrice }}</span>
                <img src="../../assets/img/points.png" />
              </div>
            </div>
            <div class="pack-amount mt-3">
              <div class="pack-amount__text text-right">AMOUNT</div>
              <div class="pack-amount__selector">
                <v-select :items="nrOfPacks" v-model="pack.pack_qty" :menu-props="{contentClass:'select-pack-count'}" ></v-select>
              </div>
              <div class="pack-amount__button">
                <v-btn small v-on:click="buyPack(pack)" class="buy-action btn-success ma-0" >
                  Buy now
                </v-btn>
              </div>
            </div>
            <div class="pack-info mt-3 mb-3">
              <div v-tooltip.top="'Min '+pack.minimumPlayerAmount+' PLAYERS'" class="pack-info__detail" v-if="pack.minimumPlayerAmount">
                <span class="detail-number">{{pack.minimumPlayerAmount}}</span>
                <span class="detail-text"><span>PLAYERS</span></span>
              </div>
              <div v-tooltip.top="'Min '+pack.minimumGoldAmount+' GOLD'" class="pack-info__detail" v-if="pack.minimumGoldAmount">
                <span class="detail-number">{{pack.minimumGoldAmount}}</span>
                <span class="detail-text">GOLD</span>
              </div>
              <div v-tooltip.top="'Min '+pack.cardAmount+' ITEMS'" class="pack-info__detail" v-if="pack.cardAmount">
                <span class="detail-number">{{pack.cardAmount}}</span>
                <span class="detail-text">ITEMS</span>
              </div>
            </div>
            <div class="pack-small-text mb-2">
              <span>MIN. GUARANTEES</span>
            </div>
          </v-card>
        </slide>
      </carousel>
      <div v-else class="marketplace-section-1">
        <h4 class="mt-5">{{errorMessage}}</h4>
      </div>
    </v-container>
  </v-layout>
</template>
<script>
import vuetifyToast from 'vuetify-toast'

export default {
  name: 'Packs',
  components: {

  },
  props: {
    errorMessage: String,
  },
  data() {
    return {
      rowsPerPageItems: [4, 8, 12],
      pagination: {
        rowsPerPage: 4
      },
      activeBuy: false,
      pack_qty: 1,
     
      nrOfPacks: [1, 2, 3, 4, 5]
    }
  },
  computed: {
    masterPacks() {
      return this.$store.getters['packs/getPacks']
    }
  },
  methods: {
    use(pack, type){
      let payload = {pack: pack, use: type}
      this.$store.dispatch('packs/currencyUse', payload)
    },
    buyPack(pack_info) {
      if (this.$store.state.authUser) {
        let payload = {
          qty: pack_info.pack_qty,
          pack_id: pack_info.id
        }

        if(pack_info.use_coin || pack_info.use_point){
          // Use Balance from
          if (pack_info.use_coin) {
            payload.balance = 'coinsBalance';
          } else {
            payload.balance = 'pointsBalance';
          }

          this.$alertify.confirm("Are you sure to buy this pack?", ()=> {
            let packIndex = this.masterPacks.findIndex(e => e.id == pack_info.id)
            pack_info.cardTypeId = false
            this.masterPacks[packIndex] = pack_info

            this.$store.dispatch('packs/buyPack', payload).then((response) => {
              
              pack_info.cardTypeId = 1

              if(response.status){
                // Update Store 
                let storeUp = (payload.balance == 'coinsBalance') ? {
                  coinsBalance: response.data.coinsBalance
                } : {
                  pointsBalance: response.data.pointsBalance
                }
                this.$store.dispatch('updateBalance', storeUp);

                vuetifyToast.success(response.message)
                this.$store.dispatch('userdata/fetchNotifications')
                if (this.$store.getters.isLoggedIn) {
                  this.$store.dispatch('packs/getMyPacks').then((response) => {}) // update store 
                }
              } else {
                vuetifyToast.error(response.message)
              }
            })
            .catch((error) => {
              vuetifyToast.error(error.response.data.data)
            })
          }, () =>{
            
          })
        } else {
          vuetifyToast.success('Select currency first!')
        }
      } else {
        vuetifyToast.success('You need to login first')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .pack-list__item {
    flex: 0 0 30%;
  }
  .p_team_id img {
      width: 25px;
  }
  .v-text-field {
    padding: unset;
  }
</style>
