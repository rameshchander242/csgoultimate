<template>
  <div class="playersWrap marketplace">
    <div class="row">
      <div class="playerListLeft grayBlock col-md-8 col-lg-9" :class="{full_panel_content: !show_details}">
        <div class="playerList">
          <v-layout wrap align-center>
            <v-flex pr-5 xs12 sm5 d-flex  v-if="cardType=='player' || cardType=='coach'">
              <v-text-field v-model="search" :label="'Search '+cardType" required></v-text-field>
            </v-flex>
            <v-flex pr-5 xs12 sm4 d-flex v-if="cardType=='player' || cardType=='coach'">
              <v-select v-model="currentSort" :items="sort_items" item-text="text" item-value="value"></v-select>
            </v-flex>
            <v-flex pr-5 xs12 sm3 d-flex>
              <v-select v-model="currentSortDir" :items="order_by_items"></v-select>
            </v-flex>
          </v-layout>
          <site-loader v-if="panel_loading"></site-loader>
          <v-data-iterator v-else
            :items="filterPlayerCards"
            :rows-per-page-items="rowsPerPageItems"
            :pagination.sync="pagination"
            :no-data-text = "'You have no items here'"
            content-tag="v-layout"
            row wrap
            >
            <v-flex pa-1 slot="item" slot-scope="props" xs12 sm6 md4 lg3 
              v-on:click="selectCard(props.item)">
              <PlayerCard 
                v-if="cardType=='player'"
                :class="props.item.cardTypeName.toLowerCase()"
                :openDetails="openDetails"
                :isActive="(cardDetails.id == props.item.id) ? true : false"
                :data="props.item" />
              <CoachCard 
                v-if="cardType=='coach'"
                :class="props.item.cardTypeName.toLowerCase()"
                :openDetails="openDetails"
                :isActive="(cardDetails.id == props.item.id) ? true : false"
                :data="props.item" />
              <FitnessCard 
                v-if="cardType=='fitness'"
                :class="props.item.cardTypeName.toLowerCase()"
                :openDetails="openDetails"
                :isActive="(cardDetails.id == props.item.id) ? true : false"
                :data="props.item" />
              <ContractCard 
                v-if="cardType=='contract'"
                :class="props.item.cardTypeName.toLowerCase()"
                :openDetails="openDetails"
                :isActive="(cardDetails.id == props.item.id) ? true : false"
                :data="props.item" />
              <BoostMapCard 
                v-if="cardType=='boostMap'"
                :class="props.item.cardTypeName.toLowerCase()"
                :openDetails="openDetails"
                :isActive="(cardDetails.id == props.item.id) ? true : false"
                :data="props.item" />
              <BoostRoleCard 
                v-if="cardType=='boostRole'"
                :class="props.item.cardTypeName.toLowerCase()"
                :openDetails="openDetails"
                :isActive="(cardDetails.id == props.item.id) ? true : false"
                :data="props.item" />
              <SwitchMapCard 
                v-if="cardType=='switchMap'"
                :class="props.item.cardTypeName.toLowerCase()"
                :openDetails="openDetails"
                :isActive="(cardDetails.id == props.item.id) ? true : false"
                :data="props.item" />
              <SwitchRoleCard 
                v-if="cardType=='switchRole'"
                :class="props.item.cardTypeName.toLowerCase()"
                :openDetails="openDetails"
                :isActive="(cardDetails.id == props.item.id) ? true : false"
                :data="props.item" />
              <BoostTeamCard 
                v-if="cardType=='boostTeam'"
                :class="props.item.cardTypeName.toLowerCase()"
                :openDetails="openDetails"
                :isActive="(cardDetails.id == props.item.id) ? true : false"
                :data="props.item" />
            </v-flex>
          </v-data-iterator>
        </div>
      </div>
      <div v-if="userCards.length > 0" class="playerListRight col-md-4 col-lg-3">
        <PlayerDetail 
          v-if="show_details && cardType=='player'"
          :class="cardDetails.cardTypeName.toLowerCase()"
          :detail_loader="card_detail_loading"
          :marketBuy="marketBuy"
          :marketRemove="marketRemove"
          :cardDetails="cardDetails"/>
        <CoachDetail 
          v-if="show_details && cardType=='coach'"
          :class="cardDetails.cardTypeName.toLowerCase()"
          :detail_loader="card_detail_loading"
          :marketBuy="marketBuy"
          :marketRemove="marketRemove"
          :cardDetails="cardDetails"/>
        <FitnessDetail 
          v-if="show_details && cardType=='fitness'"
          :class="cardDetails.cardTypeName.toLowerCase()"
          :detail_loader="card_detail_loading"
          :marketBuy="marketBuy"
          :marketRemove="marketRemove"
          :cardDetails="cardDetails"/>
        <ContractDetail 
          v-if="show_details && cardType=='contract'"
          :class="cardDetails.cardTypeName.toLowerCase()"
          :detail_loader="card_detail_loading"
          :marketBuy="marketBuy"
          :marketRemove="marketRemove"
          :cardDetails="cardDetails"/>
        <BoostMapDetail 
          v-if="show_details && cardType=='boostMap'"
          :class="cardDetails.cardTypeName.toLowerCase()"
          :detail_loader="card_detail_loading"
          :marketBuy="marketBuy"
          :marketRemove="marketRemove"
          :cardDetails="cardDetails"/>
        <BoostRoleDetail 
          v-if="show_details && cardType=='boostRole'"
          :class="cardDetails.cardTypeName.toLowerCase()"
          :detail_loader="card_detail_loading"
          :marketBuy="marketBuy"
          :marketRemove="marketRemove"
          :cardDetails="cardDetails"/>
        <SwitchMapDetail 
          v-if="show_details && cardType=='switchMap'"
          :class="cardDetails.cardTypeName.toLowerCase()"
          :detail_loader="card_detail_loading"
          :marketBuy="marketBuy"
          :marketRemove="marketRemove"
          :cardDetails="cardDetails"/>
        <SwitchRoleDetail 
          v-if="show_details && cardType=='switchRole'"
          :class="cardDetails.cardTypeName.toLowerCase()"
          :detail_loader="card_detail_loading"
          :marketBuy="marketBuy"
          :marketRemove="marketRemove"
          :cardDetails="cardDetails"/>
        <BoostTeamDetail 
          v-if="show_details && cardType=='boostTeam'"
          :class="cardDetails.cardTypeName.toLowerCase()"
          :detail_loader="card_detail_loading"
          :marketBuy="marketBuy"
          :marketRemove="marketRemove"
          :cardDetails="cardDetails"/>
      </div>
      </div>
    </div>
  </div>
</template>
<script>
  import vuetifyToast from 'vuetify-toast'
  import PlayerCard from '@/components/marketplace/PlayerCard'
  import PlayerDetail from '@/components/marketplace/PlayerDetail'
  import CoachCard from '@/components/marketplace/CoachCard'
  import CoachDetail from '@/components/marketplace/CoachDetail'
  import FitnessCard from '@/components/marketplace/FitnessCard'
  import FitnessDetail from '@/components/marketplace/FitnessDetail'
  import ContractCard from '@/components/marketplace/ContractCard'
  import ContractDetail from '@/components/marketplace/ContractDetail'
  import BoostMapCard from '@/components/marketplace/BoostMapCard'
  import BoostMapDetail from '@/components/marketplace/BoostMapDetail'
  import BoostRoleCard from '@/components/marketplace/BoostRoleCard'
  import BoostRoleDetail from '@/components/marketplace/BoostRoleDetail'
  import SwitchMapCard from '@/components/marketplace/SwitchMapCard'
  import SwitchMapDetail from '@/components/marketplace/SwitchMapDetail'
  import SwitchRoleCard from '@/components/marketplace/SwitchRoleCard'
  import SwitchRoleDetail from '@/components/marketplace/SwitchRoleDetail'
  import BoostTeamCard from '@/components/marketplace/BoostTeamCard'
  import BoostTeamDetail from '@/components/marketplace/BoostTeamDetail'
  export default {
    components: {
      PlayerCard,
      PlayerDetail,
      CoachCard,
      CoachDetail,
      FitnessCard,
      FitnessDetail,
      ContractCard,
      ContractDetail,
      BoostMapCard,
      BoostMapDetail,
      BoostRoleCard,
      BoostRoleDetail,
      SwitchMapCard,
      SwitchMapDetail,
      SwitchRoleCard,
      SwitchRoleDetail,
      BoostTeamCard,
      BoostTeamDetail,
    },
    props: {
      cardTypes: Array,
      cardType: String,
    },
    data () {
      return {
        rowsPerPageItems: [ 8, 16, 30],
        pagination: {
            rowsPerPage: 8
        },
        tabs: null,
        panel_loading: false,
        userCards: [],
        cardDetails: {},
        card_detail_loading: false,
        show_details: false,
        salePurchase: true,
        search: '',
        currentSort:'overallScore',
        currentSortDir:'Desc',
        sort_items: [
          { text: 'Overall Rank', value: 'overallScore' },
          { text: 'Newest', value: 'newest' },
          { text: 'Rifle Rank', value: 'rifleScore' },
          { text: 'Clutch Rank', value: 'clutchScore' },
          { text: 'Pistol Rank', value: 'pistolScore' },
          { text: 'AWP Rank', value: 'awpScore' },
          { text: 'Entry Rank', value: 'entryScore' },
          { text: 'IQ Rank', value: 'iqScore' },
          { text: 'Team', value: 'teamName' },
          { text: 'Country', value: 'countryName' },
          { text: 'Role', value: 'roleShortName' },
          { text: 'Map', value: 'mapLabel' },
        ],
        order_by_items: ['Asc', 'Desc'],
        checkedNames: []
      }
    },
    computed: {
      filterPlayerCards() {
        if(this.currentSort) {
          this.userCards = this.userCards.sort((a,b) => {
            let modifier = 1;
            if(this.currentSortDir === 'Desc') modifier = -1;
            if(a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
            if(a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
            return 0;
          });
        }

        if(this.search.toLowerCase()) {
          return this.userCards.filter(playerCard => {
            return playerCard.playerName.toLowerCase().includes(this.search.toLowerCase())
          })
        } else {
          if(this.userCards.length > 0)
            this.openDetails(this.userCards[0])
          return this.userCards
        }
      }
    },
    methods: {
      fetchData() {
        this.pagination.page = 1;
        this.userCards = this.$store.getters['marketplace/itemMarketplace'](this.cardType)
      },
      openDetails(player) {
        this.show_details = true
        this.cardDetails = player
      },
      selectCard(player) {
        this.show_details = true
        this.cardDetails = player
      },
      fetchMarketPlace(type) {
        this.show_details = false
        this.panel_loading = true

        let payload= { 'type': type }
        this.$store.dispatch('marketplace/fetchMarketPlace', payload)
          .then((response) => {
        console.log(payload)
            this.currentSort = 'overallScore'
            this.currentSortDir = 'Desc'
            this.fetchData()
            this.panel_loading = false
          })
          .catch((error) => {
            console.log('ddd ->', error);
            //vuetifyToast.error(error.response.data.data)
            this.panel_loading = false
          })
      },
      marketBuy(cardDetail) {
        if(this.salePurchase == false)
          return;
        this.salePurchase = false;
        vuetifyToast.success('Buy Card in process') 
        this.$store.dispatch('marketplace/marketBuy', cardDetail)
          .then((response) =>{
            if(response.status){
              this.$store.dispatch('updateInfo', response.data);
              this.removeCard(this.userCards, cardDetail);
              vuetifyToast.success(response.message)
              this.$store.dispatch('userdata/fetchNotifications')
            }else{
              vuetifyToast.error(response.message)
            }
            this.salePurchase = true;
          })
          .catch((error) => {
            console.log(error)
            this.salePurchase = true;
          })
      },
      marketRemove(cardDetail) {
        if(this.salePurchase == false)
          return;
        this.salePurchase = false;
        vuetifyToast.success('Removing from Marketplace') 
        this.$store.dispatch('marketplace/marketRemove', cardDetail)
          .then((response) =>{
            if(response.status){
              this.removeCard(this.userCards, cardDetail);
              this.salePurchase = true;
              vuetifyToast.success(response.message)
            }else{
              this.salePurchase = true;
              vuetifyToast.error(response.message)
            }
          })
          .catch((error) => {
            this.salePurchase = true;
            console.log(error)
          })
      }
    }
  }
</script>

<style>  
</style>