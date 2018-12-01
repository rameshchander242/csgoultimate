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
              :items="filterTeamBoostCards"
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
                <TeamBoostCard :class="props.item.cardTypeName.toLowerCase()" 
                  :isActive="(cardDetails.id == props.item.id) ? true : false"
                  :data="props.item" />
              </v-flex>
            </v-data-iterator>
        </div>
      </div>
      <div v-if="teamboostCards.length > 0" class="playerListRight col-md-4">
        <TeamBoostDetail
          v-if="show_details" :class="cardDetails.cardTypeName.toLowerCase()"
          :sellquickCard="sellquickCard"
          :marketSale="marketSale"
          :detail_loader="teamboost_detail_loading"
          :cardDetails="cardDetails"/>
      </div>
    </div>
  </div>
</template>
<script>
  import vuetifyToast from 'vuetify-toast'

  import TeamBoostCard from '@/components/teamboosts/TeamBoostCard'
  import TeamBoostDetail from '@/components/teamboosts/TeamBoostDetail'
  export default {
    components: {
      TeamBoostCard,
      TeamBoostDetail
    },
    data () {
      return {
        rowsPerPageItems: [ 8, 16, 30],
        pagination: {
            rowsPerPage: 8
        },
        tabs: null,
        panel_loading: false,
        teamboostCards: [],
        cardDetails: {},
        teamboost_detail_loading: false,
        show_details: false,
        search: '',
        currentSort:'',
        currentSortDir:'',
        sort_items: [],
        order_by_items: ['Asc', 'Desc']
      }
    },
    computed: {
      filterTeamBoostCards() {
        
        if(this.currentSort) {
          this.teamboostCards = this.teamboostCards.sort((a,b) => {
            let modifier = 1;
            if(this.currentSortDir === 'Desc') modifier = -1;
            if(a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
            if(a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
            return 0;
          });
        }

        if(this.search.toLowerCase()) {
          // Search by teamboost name
          return this.teamboostCards.filter(teamboostCard => {
                return teamboostCard.teamboostName.toLowerCase().includes(this.search.toLowerCase())
            })

        } else {
          if(this.teamboostCards.length > 0 && !this.show_details)
            this.openDetails(this.teamboostCards[0])
          return this.teamboostCards
        }
      }
    },
    methods: {
      fetchData() {
        this.pagination.page = 1;
        this.teamboostCards = this.$store.getters['itemsteamboosts/itemTeamBoosts']
         if(this.teamboostCards.length > 0){
            this.currentSort = 'additionalAmount'
            this.currentSortDir = 'Desc'
            //this.openDetails(this.teamboostCards[0])
         }
      },
      resetFilters() {
        this.search = ''
        this.currentSort = ''
        this.currentSortDir = ''
        this.fetchItemTeamBoosts()
      },
      openDetails(teamboost) {
        this.show_details = true
        this.cardDetails = teamboost
      },
      sellquickCard(payload) {
        this.sellQuickCard(payload, this.teamboostCards);
      },
      marketSale(payload) {
        this.marketPlaceSale(payload, this.teamboostCards);
      },
      fetchItemTeamBoosts() {
        this.show_details = false
        this.panel_loading = true
        this.$store.dispatch('itemsteamboosts/getItemTeamBoosts')
          .then((response) => {
            this.currentSort = 'additionalAmount'
            this.currentSortDir = 'Desc'
            this.fetchData()
            this.panel_loading = false
          })
          .catch((error) => {
            vuetifyToast.error(error.response.data)
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
