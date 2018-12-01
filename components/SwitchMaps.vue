<template>
  <div class="playersWrap">
    <div class="row">
      <div class="playerListLeft grayBlock col-md-8" :class="{full_panel_content: !show_details}">
        <div class="playerList">
            <v-layout wrap align-center>
              <v-flex pr-5 xs12 sm3 d-flex>
                <v-select
                  v-model="currentSortDir"
                  :items="order_by_items"
                ></v-select>
              </v-flex>
            </v-layout>
            <site-loader v-if="panel_loading"></site-loader>
            <v-data-iterator
              v-else
              :items="filterSwitchMapCards"
              :rows-per-page-items="rowsPerPageItems"
              :pagination.sync="pagination"
              :no-data-text = "'You have no items here'"
              content-tag="v-layout"
              row
              wrap
              >
              <v-flex
                pa-1
                slot="item"
                slot-scope="props"
                xs12
                sm6
                md4
                lg3
                v-on:click="openDetails(props.item)"
                >
                <SwitchMapCard :class="props.item.cardTypeName.toLowerCase()"
                  :isActive="(cardDetails.id == props.item.id) ? true : false"
                  :data="props.item" />
              </v-flex>
            </v-data-iterator>
        </div>
      </div>
      <div v-if="switchmapCards.length > 0" class="playerListRight col-md-4">
        <SwitchMapDetail
          v-if="show_details" :class="cardDetails.cardTypeName.toLowerCase()"
          :sellquickCard="sellquickCard"
          :marketSale="marketSale"
          :detail_loader="switchmap_detail_loading"
          :cardDetails="cardDetails"/>
      </div>
    </div>
  </div>
</template>
<script>
  import vuetifyToast from 'vuetify-toast'

  import SwitchMapCard from '@/components/switchmaps/SwitchMapCard'
  import SwitchMapDetail from '@/components/switchmaps/SwitchMapDetail'
  export default {
    components: {
      SwitchMapCard,
      SwitchMapDetail
    },
    data () {
      return {
        rowsPerPageItems: [ 8, 16, 30],
        pagination: {
            rowsPerPage: 8
        },
        tabs: null,
        panel_loading: false,
        switchmapCards: [],
        cardDetails: {},
        switchmap_detail_loading: false,
        show_details: false,
        search: '',
        currentSort:'',
        currentSortDir:'',
        sort_items: [],
        order_by_items: ['Asc', 'Desc']
      }
    },
    computed: {
      filterSwitchMapCards() {
        if(this.currentSort) {
          this.switchmapCards = this.switchmapCards.sort((a,b) => {
            let modifier = 1;
            if(this.currentSortDir === 'Desc') modifier = -1;
            if(a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
            if(a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
            return 0;
          });
        }

        if(this.search.toLowerCase()) {
          // Search by switchmap name
          return this.switchmapCards.filter(switchmapCard => {
                return switchmapCard.switchmapName.toLowerCase().includes(this.search.toLowerCase())
            })

        } else {
          if(this.switchmapCards.length > 0 && !this.show_details)
            this.openDetails(this.switchmapCards[0])
          return this.switchmapCards
        }
      }
    },
    methods: {
      fetchData() {
        this.pagination.page = 1;
        this.switchmapCards = this.$store.getters['itemsswitchmaps/itemSwitchMaps']
         if(this.switchmapCards.length > 0){
            this.currentSort = 'additionalAmount'
            this.currentSortDir = 'Desc'
            //this.openDetails(this.switchmapCards[0])
         }
      },
      resetFilters() {
        this.search = ''
        this.currentSort = ''
        this.currentSortDir = ''
        this.fetchItemSwitchMaps()
      },
      openDetails(switchmap) {
        this.show_details = true
        this.cardDetails = switchmap
      },
      sellquickCard(payload) {
        this.sellQuickCard(payload, this.switchmapCards);
      },
      marketSale(payload) {
        this.marketPlaceSale(payload, this.switchmapCards);
      },
      fetchItemSwitchMaps() {
        this.show_details = false
        this.panel_loading = true
        this.$store.dispatch('itemsswitchmaps/getItemSwitchMaps')
          .then((response) => {
            this.currentSort = 'additionalAmount'
            this.currentSortDir = 'Desc'
            this.fetchData()
            this.panel_loading = false
          })
          .catch((error) => {
            vuetifyToast.error(error.response.data.data)
            this.panel_loading = false
          })
          
          // testing
          this.fetchData()
      }
    }
  }
</script>

<style>
</style>
