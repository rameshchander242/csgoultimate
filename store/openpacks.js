import axios from '@/plugins/axios'
import { getAuthToken } from '@/plugins/Auth'

export const state = () => ({
  openedPack: {},
  mapList: {},
  skipAnimatino: false,
  packImage: '',

})

export const mutations = {
  SET_OPENED_PACK(state, pack) {
    state.openedPack = pack;
  },

  SET_OPENED_MAP(state, map) {
    state.mapList = map;
  }
}

export const getters = {
  getOpenedPack(state) {

    return state.openedPack
  },
  getMaps(state) {
    return state.mapList
  }
}

export const actions = {
  async getOpeningPack ({commit, store}, card_id) {
    let head_payload = { headers: { Authorization: getAuthToken() } }

    // POST request
    let myPackResponse = await axios.get('/api/open-packs/' + card_id, head_payload)
    myPackResponse = myPackResponse.data

    let myMapResponse = await axios.get('/api/maps/', head_payload)
    myMapResponse = myMapResponse.data

    // if(myPackResponse.status == true){
     commit('SET_OPENED_PACK', myPackResponse.data)

     commit('SET_OPENED_MAP', myMapResponse.data)
    // }
    return myPackResponse
  }
}


/*  Other helper functions  */

// Parse Player data
var parsePlayer = (indicator, card) => {
  let player_info = {
    id: card.id,
    indicator: indicator,
    teamName: '',
    teamLogo:'',
    countryName: '',
    countryLogo: '',
    formLevel: card.formLevel,
    cardTypeName:'',
    backgroundUrl: '',
    pictureUrl: '',
    overallScore: 0,
    playerName: '',
    roleLabel: '',
    mapLabel: 'NUKE',
    rifleScore: 0,
    clutchScore: 0,
    pistolScore: 0,
    awpScore: 0,
    entryScore: 0,
    iqScore: 0,
    quickSellValue: 0,
    roleShortName: ''
  }

  // check value
  let playerCardData = card
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
    player_info.pictureUrl = playersData.pictureUrl
    player_info.playerName = playersData.playerName

    if(playersData.teamData) {
      player_info.teamLogo = playersData.teamData.logoUrl
      player_info.teamName = playersData.teamData.teamName

    }

    if(playersData.countryData){
      player_info.countryName = playersData.countryData.countryName
      player_info.countryLogo = playersData.countryData.imageUrl
    }
  }
  
  if(card.mapLabel) {
    player_info.mapLabel = card.mapLabel
  }
  return player_info
}

// Parse Coaches data
var parseCoach = (indicator, card) => {
  let coach_info = {
    indicator: indicator,
    teamName: '',
    teamLogo:'',
    countryName: '',
    countryLogo: '',
    formLevel: card.formLevel,
    cardTypeName:'',
    backgroundUrl: '',
    pictureUrl: '',
    overallScore: 0,
    playerName: '',
    roleLabel: '',
    mapLabel: 'NUKE',
    quickSellValue: 0,
    roleShortName: ''
  }

  // check value
  let playerCardData = card
  coach_info.backgroundUrl = playerCardData.backgroundUrl
  coach_info.overallScore = playerCardData.overallScore

  if(playerCardData.rarityLevelsData) {
    coach_info.quickSellValue = playerCardData.rarityLevelsData.quickSellValue
  }

  if(playerCardData.cardTypesData) {
    coach_info.cardTypeName = playerCardData.cardTypesData.label
  }

  if(playerCardData.rolesData) {
    coach_info.roleLabel = playerCardData.rolesData.label
    coach_info.roleShortName = playerCardData.rolesData.shortName
  }

  if(playerCardData.coachData){
    let coachData = playerCardData.coachData
    coach_info.pictureUrl = coachData.pictureUrl
    coach_info.coachName = coachData.coachName

    if(coachData.teamData) {
      coach_info.teamLogo = coachData.teamData.logoUrl
      coach_info.teamName = coachData.teamData.teamName
    }

    if(coachData.countryData){
      coach_info.countryName = coachData.countryData.countryName
      coach_info.countryLogo = coachData.countryData.imageUrl
    }
  }
  
  if(card.mapData) {
    coach_info.mapLabel = card.mapData.label
  }
  return coach_info
}

// Parse Fitness data
var parseFitness = (indicator, card) => {
    let fitness_info = {
      indicator: indicator,
      quickSellValue: 0,
      backgroundUrl: card.image
    }
    let fitnessCardData = card
    if(fitnessCardData.rarityLevelsData) {
      fitness_info.quickSellValue = fitnessCardData.rarityLevelsData.quickSellValue
    }

    if(fitnessCardData.cardTypesData) {
      fitness_info.cardTypeName = fitnessCardData.cardTypesData.label
    }

    return fitness_info
}

// Parse Fitness data
var parseContract = (indicator, card) => {
    let fitness_info = {
      indicator: indicator,
      quickSellValue: 0,
      backgroundUrl: card.image
    }
    let fitnessCardData = card
    if(fitnessCardData.rarityLevelsData) {
      fitness_info.quickSellValue = fitnessCardData.rarityLevelsData.quickSellValue
    }

    if(fitnessCardData.cardTypesData) {
      fitness_info.cardTypeName = fitnessCardData.cardTypesData.label
    }

    return fitness_info
}