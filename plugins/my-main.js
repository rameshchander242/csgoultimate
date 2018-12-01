import Vue from 'vue'
import common from '~/assets/js/common'
import vuetifyToast from 'vuetify-toast'
Vue.mixin({
  data () {
    return {
      windowWidth: 0,
      windowHeight: 0,
    }
  },
  mounted(){
    this.$nextTick(function() {
      window.addEventListener('resize', this.getWindowWidth);
      window.addEventListener('resize', this.getWindowHeight);
      this.getWindowWidth()
      this.getWindowHeight()
    })
  },
  methods: {
    getWindowWidth(event) {
      this.windowWidth = document.documentElement.clientWidth;
    },
    getWindowHeight(event) {
      this.windowHeight = document.documentElement.clientHeight;
    },

    cardSortOrder(a) {
      console.log(a)
    },
    testMethod(){
    	console.log('TEst Successfull')
    },
    cardConditionValue(cval){
      let conditionValue = 'Factory New';
      if(cval>0.79){
        conditionValue = 'Battle Scarred';
      }else if(cval>0.59){
        conditionValue = 'Well-Worn';
      }else if(cval>0.25){
        conditionValue = 'Field-Tested';
      }else if(cval>0.09){
        conditionValue = 'Minimal Wear';
      }else{
        conditionValue = 'Factory New';
      }
      return conditionValue;
    },
    encodeCode(str){
      return btoa(str);
    },
    decodeCode(str){
      return atob(str);
    },

    removeCard(itemCards, payload){
      const Cards_temp = itemCards
      let ItemIndex = Cards_temp.findIndex(item => item.id == payload.id)
      Cards_temp.splice(ItemIndex, 1)
      itemCards = Cards_temp
      if(itemCards[ItemIndex] == undefined)
        ItemIndex = ItemIndex-1;
      this.openDetails(itemCards[ItemIndex]);
      return {'itemCards': itemCards, 'itemIndex':ItemIndex};
    },

    marketPlaceSale(payload, itemCards){
      if(isNaN(payload.marketValue) || payload.marketValue <= 0){
        this.$alertify.alert("Marketplace", "Market Price must be greater than 0");
        return;
      }
      if(this.$store.quickSellDisable == true) return;
      this.$store.quickSellDisable = true
      vuetifyToast.success('Market sell in process') 
      this.$store.dispatch('marketplace/marketSale', payload)
        .then((response) => {
          if(response.status){
            let cardList = this.removeCard(itemCards, payload);
            vuetifyToast.success(response.message)
          } else {
             vuetifyToast.error(response.message)
          }
          this.$store.quickSellDisable = false
        })
        .catch((error) => {
          console.log(error);
          this.$store.quickSellDisable = false
        })
    },
    sellQuickCard(payload, itemCards){
      if(this.$store.quickSellDisable == true) return;
      this.$store.quickSellDisable = true
      vuetifyToast.success('Quick sell in process') 
      this.$store.dispatch('itemsquicksell/sellItemQuick', payload)
        .then((response) => {
          if(response.status){
            this.$store.dispatch('updateInfo', response.data);
            this.removeCard(itemCards, payload);
            vuetifyToast.success(response.message)
            this.$store.dispatch('userdata/fetchNotifications')
          } else {
             vuetifyToast.error(response.message)
          }
          this.$store.quickSellDisable = false
        })
        .catch((error) => {
          vuetifyToast.error(error.response.data.data)
          this.$store.quickSellDisable = false
        })
    }

  }
})