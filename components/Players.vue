<template>
  <div class="playersWrap">
    <div class="row">
      <div class="playerListLeft grayBlock col-md-8" :class="{full_panel_content: !show_details}">
        <div class="playerList">
             <v-layout wrap align-center>
                <v-flex pr-5 xs12 sm5 d-flex>
                  <v-text-field
                    v-model="search"
                    label="Search Player"
                    required
                    ></v-text-field>
                </v-flex>
                <v-flex pr-5 xs12 sm4 d-flex>
                    <v-select
                      v-model="currentSort"
                      :items="sort_items"
                      item-text="text"
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
              :items="filterPlayerCards"
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
                v-on:click="selectCard(props.item)"
                >

                <PlayerCard :class="props.item.cardTypeName.toLowerCase()"
                  :openDetails="openDetails"
                  :isActive="(cardDetails.id == props.item.id) ? true : false"
                  :quickSell="quickSell"
                  :quickSellPrice="quickSellPrice"
                  :data="props.item" />
              </v-flex>
            </v-data-iterator>
        </div>
      </div>
      <div v-if="playerCards.length > 0 && windowWidth>768" class="playerListRight col-md-4">
        <PlayerDetail :class="cardDetails.cardTypeName.toLowerCase()"
          v-if="show_details"
          :sellquickCard="sellquickCard"
          :marketSale="marketSale"
          :detail_loader="player_detail_loading"
          :cardDetails="cardDetails"/>

        <PlayerSelectedSell
          v-if="quickSell.length > 0"
          :quickSell="quickSell"
          :quickSellPrice="quickSellPrice"
          :sellSelectedPlayer="sellSelectedPlayer"/>
      </div>
      <ModalBox 
        class="cardDetail_model"
        title=''
        :show="showDialog"
        :maxWidth= "'400'"
        :actions="actions"
        
        v-else-if="playerCards.length > 0 && windowWidth<=768"
        >
        <v-layout wrap class="cardDetail">
          <v-flex xs12 >
            <div class="playerListRight">
              <PlayerDetail :class="cardDetails.cardTypeName.toLowerCase()"
                v-if="show_details"
                :sellquickCard="sellquickCard"
                :marketSale="marketSale"
                :detail_loader="player_detail_loading"
                :cardDetails="cardDetails"/>
            </div>
          </v-flex>
        </v-layout>
      </ModalBox>
      </div>
    </div>
  </div>
</template>
<script>
  import ModalBox from '~/components/helpers/ModalBox'
  import PlayerCard from '@/components/players/PlayerCard'
  import PlayerDetail from '@/components/players/PlayerDetail'
  import PlayerSelectedSell from '@/components/players/PlayerSelectedSell'
  export default {
    components: {
      PlayerCard,
      PlayerDetail,
      PlayerSelectedSell,
      ModalBox
    },
    data () {
      return {
        rowsPerPageItems: [ 8, 16, 30],
        pagination: {
            rowsPerPage: 8,
        },
        tabs: null,
        panel_loading: false,
        quickSell: [],
        quickSellPrice: [],
        playerCards: [],
        cardDetails: {},
        player_detail_loading: false,
        show_details: false,
        showDialog: false,
        actions: [
          {
            title: 'Close',
            style: 'red',
            callback: this.closeDialog
        }],
        persistent: false,
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
          { text: 'Map', value: 'mapLabel'}
        ],
        order_by_items: ['Asc', 'Desc'],
        checkedNames: [],
      }
    },
    computed: {
      filterPlayerCards() {
        if(this.currentSort) {
          this.playerCards = this.playerCards.sort((a,b) => {
            let modifier = 1;
            if(this.currentSortDir === 'Desc') modifier = -1;
            if(a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
            if(a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
            return 0;
          });
        }

        if(this.search.toLowerCase()) {
          // Search by player name
          return this.playerCards.filter(playerCard => {
                return playerCard.playerName.toLowerCase().includes(this.search.toLowerCase())
            })

        } else {
          if(this.playerCards.length > 0 && !this.show_details)
            this.openDetails(this.playerCards[0])
          return this.playerCards
        }
      }
    },
    methods: {
      closeDialog(){
        this.showDialog = false
      },

      fetchData() {
        this.pagination.page = 1;
        this.playerCards = this.$store.getters['itemsplayers/itemPlayers']
      },
      openDetails(card) {
        this.show_details = true
        this.cardDetails = card
      },
      selectCard(card) {
        this.showDialog = true
        this.show_details = true
        this.cardDetails = card
      },
      sellquickCard(payload) {
        this.sellQuickCard(payload, this.playerCards);
      },
      marketSale(payload) {
        this.marketPlaceSale(payload, this.playerCards);
      },

      sellSelectedPlayer(players, type){
        let payload = {
          id: players,
          type: type
        }
        vuetifyToast.success('Qucik Sell is in-processing..')
        this.$store.dispatch('itemsplayers/sellPlayer', payload)
          .then((response) => {
            if(response.status){ 
              this.$store.dispatch('updateInfo', response.data);
              this.fetchData()
              vuetifyToast.success(response.message)
            } else {
               vuetifyToast.error(response.message)
            }
            // this.player_detail_loading = false
          })
          .catch((error) => {
            vuetifyToast.error(error.response.data.data)
            // this.player_detail_loading = false
          })

      },
      fetchItemPlayers() {
        this.show_details = false
        this.panel_loading = true
        this.quickSell = []
        this.quickSellPrice = []

        this.$store.dispatch('itemsplayers/getItemPlayers')
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
      }
    }
  }
</script>

<style>  
</style>
