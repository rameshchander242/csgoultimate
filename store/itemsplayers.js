import axios from '@/plugins/axios'
import { getAuthToken } from '@/plugins/Auth'

export const state = () => ({
  item_payers: [],
  item_payer: []
})

export const mutations = {
  SET_ITEM_PLAYERS: (state, item_players) => {
    state.item_payers = item_players
  },
  SET_ITEM_PLAYER: (state, item_player) => {
    state.item_payer = item_player
  }
}

export const getters = {
  itemPlayers(state) {
    // Store data maniplation here for UI.. 
    if(state.item_payers.length > 0) {
      let UICards = []
      state.item_payers.forEach((player) => {
        let player_info = {
          id: player.id,
          teamName: '',
          teamLogo:'',
          countryName: '',
          countryLogo: '',
          formLevel: player.formLevel,
          cardTypeName:'',
          backgroundUrl: '',
          pictureUrl: '',
          overallScore: 0,
          playerName: '',
          condition: player.condition,
          roleLabel: '',
          mapLabel: '',
          rifleScore: 0,
          clutchScore: 0,
          pistolScore: 0,
          awpScore: 0,
          entryScore: 0,
          iqScore: 0,
          quickSellValue: 0,
          roleShortName: '',
          newest: player.createdAt,
        }

        // check value
        if(player.playerCardData) {
          let playerCardData = player.playerCardData
          player_info.backgroundUrl = playerCardData.backgroundUrl
          player_info.overallScore = playerCardData.overallScore
          player_info.rifleScore = playerCardData.rifleScore
          player_info.clutchScore = playerCardData.clutchScore
          player_info.pistolScore = playerCardData.pistolScore
          player_info.awpScore = playerCardData.awpScore
          player_info.entryScore = playerCardData.entryScore
          player_info.iqScore = playerCardData.iqScore
          player_info.playerCardId = playerCardData.id

          if(playerCardData.rarityLevelsData) {
            player_info.quickSellValue = playerCardData.rarityLevelsData.quickSellValue
          }

          if(playerCardData.cardTypesData) {
            player_info.cardTypeName = playerCardData.cardTypesData.label
          }

          if(playerCardData.rolesData) {
            player_info.roleLabel = playerCardData.rolesData.label
            player_info.roleShortName = playerCardData.rolesData.shortName
          }

          if(playerCardData.playersData){
            let playersData = playerCardData.playersData
            player_info.teamLogo = (playersData.teamData)? playersData.teamData.logoUrl : ''
            player_info.teamName = (playersData.teamData)? playersData.teamData.teamName : ''
            player_info.pictureUrl = playersData.pictureUrl
            player_info.playerName = playersData.playerName

            if(playersData.countryData){
              player_info.countryLogo = playersData.countryData.imageUrl
              player_info.countryName = playersData.countryData.countryName
            }
          }
        }else{
          return;
        }

        if(player.mapData) {
          player_info.mapLabel = player.mapData.label
        }

        UICards.push(player_info)
      })

      return UICards
    } else {
      return []
    }
  },
  totalPlayers(state){
    return (state.item_payers.length > 0 ) ? state.item_payers.length : 0
  },

  itemPlayer(state) {
    // Store data maniplation here for UI.. 
    if(state.item_payer.id > 0) {
      let player = state.item_payer;
      let player_info = {
        id: player.id,
        teamName: '',
        teamLogo:'',
        countryName: '',
        countryLogo: '',
        formLevel: player.formLevel,
        cardTypeName:'',
        backgroundUrl: '',
        pictureUrl: '',
        overallScore: 0,
        playerName: '',
        condition: player.condition,
        roleLabel: '',
        mapLabel: '',
        rifleScore: 0,
        clutchScore: 0,
        pistolScore: 0,
        awpScore: 0,
        entryScore: 0,
        iqScore: 0,
        quickSellValue: 0,
        roleShortName: '',
        userData: player.userData
      }

      // check value
      if(player.playerCardData) {
        let playerCardData = player.playerCardData
        player_info.backgroundUrl = playerCardData.backgroundUrl
        player_info.overallScore = playerCardData.overallScore
        player_info.rifleScore = playerCardData.rifleScore
        player_info.clutchScore = playerCardData.clutchScore
        player_info.pistolScore = playerCardData.pistolScore
        player_info.awpScore = playerCardData.awpScore
        player_info.entryScore = playerCardData.entryScore
        player_info.iqScore = playerCardData.iqScore

        if(playerCardData.rarityLevelsData) {
          player_info.quickSellValue = playerCardData.rarityLevelsData.quickSellValue
        }

        if(playerCardData.cardTypesData) {
          player_info.cardTypeName = playerCardData.cardTypesData.label
        }

        if(playerCardData.rolesData) {
          player_info.roleLabel = playerCardData.rolesData.label
          player_info.roleShortName = playerCardData.rolesData.shortName
        }

        if(playerCardData.playersData){
          let playersData = playerCardData.playersData
          player_info.teamLogo = (playersData.teamData)? playersData.teamData.logoUrl : ''
          player_info.teamName = (playersData.teamData)? playersData.teamData.teamName : ''
          player_info.pictureUrl = playersData.pictureUrl
          player_info.playerName = playersData.playerName

          if(playersData.countryData){
            player_info.countryLogo = playersData.countryData.imageUrl
            player_info.countryName = playersData.countryData.countryName
          }
        }

        if(player.mapData) {
          player_info.mapLabel = player.mapData.label
        }
      }

      return player_info
    } else {
      return null
    }
  },
}

export const actions = {
  async getItemPlayers ({commit, store}) {
    let head_payload = { headers: { Authorization: getAuthToken() } }
    let itemPlayersResponse = await axios.get('/api/item-players', head_payload)
    itemPlayersResponse = itemPlayersResponse.data
    if(itemPlayersResponse.status == true){
      commit('SET_ITEM_PLAYERS', itemPlayersResponse.data)
    }
    return itemPlayersResponse
  },
  async sellPlayer({commit, store}, payload) {
    let head_payload = { headers: { Authorization: getAuthToken() } }
    let itemQuickSellResponse = await axios.post('/api/item-player-sell',payload, head_payload)
    itemQuickSellResponse = itemQuickSellResponse.data
    if(itemQuickSellResponse.status == true) {

      // commit('SET_ITEM_PLAYERS', itemQuickSellResponse.data)
    }

    return itemQuickSellResponse
  },
  async getItemPlayer({commit, store}, cardId) {
    let head_payload = { headers: { Authorization: getAuthToken() } }
    let itemPlayerResponse = await axios.get('/api/item-players/'+cardId, head_payload)
    itemPlayerResponse = itemPlayerResponse.data
    if(itemPlayerResponse.status == true){
      commit('SET_ITEM_PLAYER', itemPlayerResponse.data)
    }
    return itemPlayerResponse
  }

}