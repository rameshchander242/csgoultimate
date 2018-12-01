<template>
  <div class="playersWrap">
    <div class="row">
      <div class="playerListLeft grayBlock col-md-8" :class="{full_panel_content: !show_details}">
        <div class="playerList">
              <v-layout wrap align-center>
              <v-flex pr-5 xs12 sm6 d-flex>
                <v-text-field
                  v-model="search"
                  label="Search coach"
                  required
                  ></v-text-field>
              </v-flex>
              <v-flex pr-5 xs12 sm3 d-flex>
                <v-select
                  v-model="currentSort"
                  :items="sort_items"
                  item-text="label"
                  item-value="value"
                ></v-select>
              </v-flex>
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
              :items="filterCoachCards"
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
                <CoachCard :class="props.item.cardTypeName.toLowerCase()"
                  :isActive="(cardDetails.id == props.item.id) ? true : false"
                  :data="props.item" />
              </v-flex>
            </v-data-iterator>
        </div>
      </div>
      <div v-if="coachCards.length > 0" class="playerListRight col-md-4">
        <CoachDetail :class="cardDetails.cardTypeName.toLowerCase()"
          v-if="show_details"
          :sellquickCard="sellquickCard"
          :marketSale="marketSale"
          :detail_loader="coach_detail_loading"
          :cardDetails="cardDetails"/>
      </div>
    </div>
  </div>
</template>
<script>
  import vuetifyToast from 'vuetify-toast'

  import CoachCard from '@/components/coaches/CoachCard'
  import CoachDetail from '@/components/coaches/CoachDetail'
  export default {
    components: {
      CoachCard,
      CoachDetail
    },
    data () {
      return {
        rowsPerPageItems: [ 8, 16, 30],
        pagination: {
            rowsPerPage: 8
        },
        tabs: null,
        panel_loading: false,
        coachCards: [],
        cardDetails: {},
        coach_detail_loading: false,
        show_details: false,
        search: '',
        currentSort:'',
        currentSortDir:'',
        sort_items: [
          { label: 'Rank', value: 'overallScore' },
          { label: 'Newest', value: 'newest' },
          { label: 'Team', value: 'teamName' },
          { label: 'Country', value: 'countryName' },
          { label: 'Role', value: 'roleShortName' },
          { label: 'Map', value: 'mapLabel' }
        ],
        order_by_items: ['Asc', 'Desc']
      }
    },
    computed: {
      filterCoachCards() {
        if(this.currentSort) {
          this.coachCards = this.coachCards.sort((a,b) => {
            let modifier = 1;
            if(this.currentSortDir === 'Desc') modifier = -1;
            if(a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
            if(a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
            return 0;
          });
        }

        if(this.search.toLowerCase()) {
          // Search by coach name
          return this.coachCards.filter(coachCard => {
                return coachCard.coachName.toLowerCase().includes(this.search.toLowerCase())
            })

        } else {
          if(this.coachCards.length > 0 && !this.show_details)
            this.openDetails(this.coachCards[0])
          return this.coachCards
        }
      }
    },
    methods: {
      fetchData() {
        this.pagination.page = 1;
        this.coachCards = this.$store.getters['itemscoaches/itemCoaches']
         if(this.coachCards.length > 0){
            this.currentSort = 'overallScore'
            this.currentSortDir = 'Desc'
            //this.openDetails(this.coachCards[0])
         }
      },
      resetFilters() {
        this.search = ''
        this.currentSort = ''
        this.currentSortDir = ''
        this.fetchItemCoaches()
      },
      openDetails(card) {
        this.show_details = true
        this.cardDetails = card
      },
      sellquickCard(payload) {
        this.sellQuickCard(payload, this.coachCards);
      },
      marketSale(payload) {
        this.marketPlaceSale(payload, this.coachCards);
      },
      fetchItemCoaches() {
        this.show_details = false
        this.panel_loading = true
        this.$store.dispatch('itemscoaches/getItemCoaches')
          .then((response) => {
            this.currentSort = 'overallScore'
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
