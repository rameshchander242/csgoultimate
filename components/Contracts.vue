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
              :items="filterContractCards"
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
                <ContractCard :class="props.item.cardTypeName.toLowerCase()""
                  :isActive="(cardDetails.id == props.item.id) ? true : false"
                  :data="props.item" />
              </v-flex>
            </v-data-iterator>
        </div>
      </div>
      <div v-if="contractCards.length > 0" class="playerListRight col-md-4">
        <ContractDetail :class="cardDetails.cardTypeName.toLowerCase()"
          v-if="show_details"
          :sellquickCard="sellquickCard"
          :marketSale="marketSale"
          :detail_loader="contract_detail_loading"
          :cardDetails="cardDetails"/>
      </div>
    </div>
  </div>
</template>
<script>
  import vuetifyToast from 'vuetify-toast'

  import ContractCard from '@/components/contracts/ContractCard'
  import ContractDetail from '@/components/contracts/ContractDetail'
  export default {
    components: {
      ContractCard,
      ContractDetail
    },
    data () {
      return {
        rowsPerPageItems: [ 8, 16, 30],
        pagination: {
            rowsPerPage: 8
        },
        tabs: null,
        panel_loading: false,
        contractCards: [],
        cardDetails: {},
        contract_detail_loading: false,
        show_details: false,
        search: '',
        currentSort:'',
        currentSortDir:'',
        sort_items: [],
        order_by_items: ['Asc', 'Desc']
      }
    },
    computed: {
      filterContractCards() {
        if(this.currentSort) {
          this.contractCards = this.contractCards.sort((a,b) => {
            let modifier = 1;
            if(this.currentSortDir === 'Desc') modifier = -1;
            if(a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
            if(a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
            return 0;
          });
        }

        if(this.search.toLowerCase()) {
          // Search by contract name
          return this.contractCards.filter(contractCard => {
                return contractCard.contractName.toLowerCase().includes(this.search.toLowerCase())
            })

        } else {
          if(this.contractCards.length > 0 && !this.show_details)
            this.openDetails(this.contractCards[0])
          return this.contractCards
        }
      }
    },
    methods: {
      fetchData() {
        this.pagination.page = 1;
        this.contractCards = this.$store.getters['itemscontracts/itemContracts']
         if(this.contractCards.length > 0){
            this.currentSort = 'additionalAmount'
            this.currentSortDir = 'Desc'
            //this.openDetails(this.contractCards[0])
         }
      },
      resetFilters() {
        this.search = ''
        this.currentSort = ''
        this.currentSortDir = ''
        this.fetchItemContracts()
      },
      openDetails(contract) {
        this.show_details = true
        this.cardDetails = contract
      },
      sellquickCard(payload) {
        this.sellQuickCard(payload, this.contractCards);
      },
      marketSale(payload) {
        this.marketPlaceSale(payload, this.contractCards);
      },
      fetchItemContracts() {
        this.show_details = false
        this.panel_loading = true
        this.$store.dispatch('itemscontracts/getItemContracts')
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
