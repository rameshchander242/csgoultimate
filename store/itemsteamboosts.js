import axios from '@/plugins/axios'
import { getAuthToken } from '@/plugins/Auth'

export const state = () => ({
  item_teamboosts: []
})

export const mutations = {
  SET_ITEM_COACHES: (state, item_teamboosts) => {
    state.item_teamboosts = item_teamboosts
  }
}

export const getters = {
  itemTeamBoosts(state) {

    // Store data maniplation here for UI.. 
    if(1==1) {
      let UICards = []
      let teamboost_data = [];
      let team_boost_data = {};
      for (var key in state.item_teamboosts) {
        if(RegExp('_').exec(key.replace('boost_card_data_', ''))){
          team_boost_data[key] = state.item_teamboosts[key];
        }else{
          teamboost_data.push(team_boost_data);
          team_boost_data = state.item_teamboosts[key];
        }
      }
      teamboost_data.push(team_boost_data);
      teamboost_data.shift();

      teamboost_data.forEach((teamboost) => {
    
         let teamboost_info = {
          id: teamboost.id,
          teamName: '',
          teamLogo:'',
          countryName: '',
          countryLogo: '',
          formLevel: teamboost.formLevel,
          cardTypeName:'',
          backgroundUrl: '',
          pictureUrl: '',
          overallScore: 0,
          teamboostName: '',
          condition: teamboost.condition,
          roleLabel: '',
          mapLabel: '',
          rifleScore: 0,
          clutchScore: 0,
          pistolScore: 0,
          awpScore: 0,
          entryScore: 0,
          iqScore: 0,
          boosterPercentage: 0,
          boosterTypeId: '',
          quickSellValue: 0,
          roleShortName: '',
          boostPct1: '',
          boostPct2: '',
          boostPct3: '',
          boostPct1Label: '',
          boostPct2Label: '',
          boostPct3Label: '',
          newest: teamboost.createdAt
        }


        // Add variable here

        // check value
        
        if(teamboost.boostTeamCardData) {
          let boostTeamCardData = teamboost.boostTeamCardData
          teamboost_info.backgroundUrl = boostTeamCardData.image
          teamboost_info.additionalAmount = boostTeamCardData.boostPct1 + boostTeamCardData.boostPct2 + boostTeamCardData.boostPct3
          teamboost_info.boostPct1 = boostTeamCardData.boostPct1
          teamboost_info.boostPct2 = boostTeamCardData.boostPct2
          teamboost_info.boostPct3 = boostTeamCardData.boostPct3
          
          for(let i=1; i<4; i++){
            let b = 'boost_card_type_'+teamboost.id+'_'+i
            teamboost_info['boostPct'+i+'Label'] = teamboost[b].label
          }
          teamboost_info.teamName = boostTeamCardData.teamData.teamName
          
          if(boostTeamCardData.cardTypesData) {
            teamboost_info.cardTypeName = boostTeamCardData.cardTypesData.label
          }

          if(boostTeamCardData.rarityLevelsData) {
            teamboost_info.quickSellValue = boostTeamCardData.rarityLevelsData.quickSellValue
          }
        }else{
          return;
        }

        if(teamboost.mapData) {
          teamboost_info.mapLabel = teamboost.mapData.label
        } 
        UICards.push(teamboost_info)
      })
      return UICards
    }else {
      return [
      {
          id: 12,
          teamName: 'test',
          teamLogo:'http://cdn.csgoultimate.gg/images/csgoultimateimage-1501500370647.png',
          countryName: 'CA',
          countryLogo: 'http://cdn.csgoultimate.gg/images/csgoultimateimage-1501497285563.jpg',
          formLevel: 12,
          cardTypeName:'New',
          backgroundUrl: 'http://cdn.csgoultimate.gg/images/csgoultimateimage-1502410115346.png',
          pictureUrl: 'http://cdn.csgoultimate.gg/images/csgoultimateimage-1502789398386.png',
          overallScore: 100,
          teamboostName: 'Esf',
          roleLabel: 'non',
          mapLabel: 'yes',
          boosterPercentage: 89,
          boosterTypeId: 'IGL',
          quickSellValue: 0,
          roleShortName: 'NYF'
        }]
    }
  },
  totalTeamBoosts(state){
    return (state.item_teamboosts.length > 0 ) ? state.item_teamboosts.length : 0
  }
}

export const actions = {
  async getItemTeamBoosts ({commit, store}) {
    let head_payload = { headers: { Authorization: getAuthToken() } }
    let itemTeamBoostsResponse = await axios.get('/api/item-boost-team-cards', head_payload)
    itemTeamBoostsResponse = itemTeamBoostsResponse.data

    if(itemTeamBoostsResponse.status == true){
      commit('SET_ITEM_COACHES', itemTeamBoostsResponse.data)

    }
    return itemTeamBoostsResponse
  }

}