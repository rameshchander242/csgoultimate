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
              :items="filterFitnessCards"
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
                <FitnessCard :class="props.item.cardTypeName.toLowerCase()"
                  :isActive="(cardDetails.id == props.item.id) ? true : false"
                  :data="props.item" />
              </v-flex>
            </v-data-iterator>
        </div>
      </div>
      <div v-if="fitnessCards.length > 0" class="playerListRight col-md-4">
        <FitnessDetail  :class="cardDetails.cardTypeName.toLowerCase()"
          v-if="show_details"
          :sellquickCard="sellquickCard"
          :marketSale="marketSale"
          :detail_loader="fitness_detail_loading"
          :cardDetails="cardDetails"/>
      </div>
    </div>
  </div>
</template>
<script>
  import vuetifyToast from 'vuetify-toast'

  import FitnessCard from '@/components/fitness/FitnessCard'
  import FitnessDetail from '@/components/fitness/FitnessDetail'
  export default {
    components: {
      FitnessCard,
      FitnessDetail
    },
    data () {
      return {
        rowsPerPageItems: [ 8, 16, 30],
        pagination: {
            rowsPerPage: 8
        },
        tabs: null,
        panel_loading: false,
        fitnessCards: [],
        cardDetails: {},
        fitness_detail_loading: false,
        show_details: false,
        search: '',
        currentSort:'',
        currentSortDir:'',
        sort_items: [],
        order_by_items: ['Asc', 'Desc'],
      }
    },
    computed: {
      w(){
        return window.innerWidth
      },
      filterFitnessCards() {
        if(this.currentSort) {
          this.fitnessCards = this.fitnessCards.sort((a,b) => {
            let modifier = 1;
            if(this.currentSortDir === 'Desc') modifier = -1;
            if(a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
            if(a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
            return 0;
          });
        }

        if(this.search.toLowerCase()) {
          // Search by fitness name
          return this.fitnessCards.filter(fitnessCard => {
                return fitnessCard.fitnessName.toLowerCase().includes(this.search.toLowerCase())
            })

        } else {
          if(this.fitnessCards.length > 0 && !this.show_details)
            this.openDetails(this.fitnessCards[0])
          return this.fitnessCards
        }
      }
    },
    methods: {
      fetchData() {
        this.pagination.page = 1;
        this.fitnessCards = this.$store.getters['itemsfitness/itemFitness']
         if(this.fitnessCards.length > 0){
            this.currentSort = 'additionAmount'
            this.currentSortDir = 'Desc'
            //this.openDetails(this.fitnessCards[0])
         }
         //console.log(this.fitnessCards);
      },
      resetFilters() {
        this.search = ''
        this.currentSort = ''
        this.currentSortDir = ''
        this.fetchItemFitness()
      },
      openDetails(fitness) {
        this.show_details = true
        this.cardDetails = fitness
      },
      sellquickCard(payload) {
        this.sellQuickCard(payload, this.fitnessCards);
      },
      marketSale(payload) {
        this.marketPlaceSale(payload, this.fitnessCards);
      },
      fetchItemFitness() {
        this.show_details = false
        this.panel_loading = true
        this.$store.dispatch('itemsfitness/getItemFitness')
          .then((response) => {
            this.currentSort = 'additionAmount'
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
