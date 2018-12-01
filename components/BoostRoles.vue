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
              :items="filterBoostRoleCards"
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
                <BoostRoleCard :class="props.item.cardTypeName.toLowerCase()"
                  :isActive="(cardDetails.id == props.item.id) ? true : false"
                  :data="props.item" />
              </v-flex>
            </v-data-iterator>
        </div>
      </div>
      <div v-if="boostroleCards.length > 0" class="playerListRight col-md-4">
        <BoostRoleDetail :class="cardDetails.cardTypeName.toLowerCase()"
          v-if="show_details"
          :sellquickCard="sellquickCard"
          :marketSale="marketSale"
          :detail_loader="boostrole_detail_loading"
          :cardDetails="cardDetails"/>
      </div>
    </div>
  </div>
</template>
<script>
  import vuetifyToast from 'vuetify-toast'

  import BoostRoleCard from '@/components/boostroles/BoostRoleCard'
  import BoostRoleDetail from '@/components/boostroles/BoostRoleDetail'
  export default {
    components: {
      BoostRoleCard,
      BoostRoleDetail
    },
    data () {
      return {
        rowsPerPageItems: [ 8, 16, 30],
        pagination: {
            rowsPerPage: 8
        },
        tabs: null,
        panel_loading: false,
        boostroleCards: [],
        cardDetails: {},
        boostrole_detail_loading: false,
        show_details: false,
        search: '',
        currentSort:'',
        currentSortDir:'',
        sort_items: [],
        order_by_items: ['Asc', 'Desc']
      }
    },
    computed: {
      filterBoostRoleCards() {
        if(this.currentSort) {
          this.boostroleCards = this.boostroleCards.sort((a,b) => {
            let modifier = 1;
            if(this.currentSortDir === 'Desc') modifier = -1;
            if(a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
            if(a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
            return 0;
          });
        }

        if(this.search.toLowerCase()) {
          // Search by boostrole name
          return this.boostroleCards.filter(boostroleCard => {
                return boostroleCard.boostroleName.toLowerCase().includes(this.search.toLowerCase())
            })

        } else {
          if(this.boostroleCards.length > 0 && !this.show_details)
            this.openDetails(this.boostroleCards[0])
          return this.boostroleCards
        }
      }
    },
    methods: {
      fetchData() {
        this.pagination.page = 1;
        this.boostroleCards = this.$store.getters['itemsboostroles/itemBoostRoles']
         if(this.boostroleCards.length > 0){
            this.currentSort = 'boostPct'
            this.currentSortDir = 'Desc'
            //this.openDetails(this.boostroleCards[0])
         }
      },
      resetFilters() {
        this.search = ''
        this.currentSort = ''
        this.currentSortDir = ''
        this.fetchItemBoostRoles()
      },
      openDetails(boostrole) {
        this.show_details = true
        this.cardDetails = boostrole
      },
      sellquickCard(payload) {
        this.sellQuickCard(payload, this.boostroleCards);
      },
      marketSale(payload) {
        this.marketPlaceSale(payload, this.boostroleCards);
      },
      fetchItemBoostRoles() {
        this.show_details = false
        this.panel_loading = true
        this.$store.dispatch('itemsboostroles/getItemBoostRoles')
          .then((response) => {
            this.currentSort = 'boostPct'
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
