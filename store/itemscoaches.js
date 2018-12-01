import axios from '@/plugins/axios'
import { getAuthToken } from '@/plugins/Auth'

export const state = () => ({
  item_coaches: []
})

export const mutations = {
  SET_ITEM_COACHES: (state, item_coaches) => {
    state.item_coaches = item_coaches
  }
}

export const getters = {
  itemCoaches(state) {

    // Store data maniplation here for UI.. 
    if(1==1) {
      let UICards = []
      state.item_coaches.forEach((coach) => {
         let coach_info = {
          id: coach.id,
          teamName: '',
          teamLogo:'',
          countryName: '',
          countryLogo: '',
          formLevel: coach.formLevel,
          cardTypeName:'',
          backgroundUrl: '',
          pictureUrl: '',
          overallScore: 0,
          coachName: '',
          condition: coach.condition,
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
          boostLabel: '',
          newest: coach.createdAt
        }

        // Add variable here

        // check value
        if(coach.coachCardData) {
          let coachCardData = coach.coachCardData
          coach_info.backgroundUrl = coachCardData.backgroundUrl
          coach_info.overallScore = coachCardData.overallScore
          coach_info.boosterPercentage = coachCardData.boostPct
          //coach_info.boosterTypeId = coachCardData.boostTypeId

          if(coachCardData.rarityLevelsData) {
            coach_info.quickSellValue = coachCardData.rarityLevelsData.quickSellValue
          }

          if(coachCardData.cardTypesData) {
            coach_info.cardTypeName = coachCardData.cardTypesData.label
          }
          if(coachCardData.boostRoleCardsData){
            coach_info.boostLabel = coachCardData.boostRoleCardsData.rolesData.label
          }else if(coachCardData.boostMapCardsData){
            coach_info.boostLabel = coachCardData.boostMapCardsData.mapsData.label
          }


          if(coachCardData.coachData){
            let coachData = coachCardData.coachData
            coach_info.teamLogo = (coachData.teamData)? coachData.teamData.logoUrl : ''
            coach_info.teamName = (coachData.teamData)? coachData.teamData.teamName : ''
            coach_info.pictureUrl = coachData.pictureUrl
            coach_info.coachName = coachData.coachName

            if(coachData.countryData){
              coach_info.countryLogo = coachData.countryData.imageUrl
              coach_info.countryName = coachData.countryData.countryName
            }
          }
        }else{
          return;
        }

        if(coach.mapData) {
          coach_info.mapLabel = coach.mapData.label
        }
        UICards.push(coach_info)
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
          coachName: 'Esf',
          roleLabel: 'non',
          mapLabel: 'yes',
          boosterPercentage: 89,
          boosterTypeId: 'IGL',
          quickSellValue: 0,
          roleShortName: 'NYF'
        }]
    }
  },
  totalCoaches(state){
    return (state.item_coaches.length > 0 ) ? state.item_coaches.length : 0
  }
}

export const actions = {
  async getItemCoaches ({commit, store}) {
    let head_payload = { headers: { Authorization: getAuthToken() } }
    let itemCoachesResponse = await axios.get('/api/item-coaches', head_payload)
    itemCoachesResponse = itemCoachesResponse.data
    if(itemCoachesResponse.status == true){
      commit('SET_ITEM_COACHES', itemCoachesResponse.data)
    }
    itemCoachesResponse.status = true
    itemCoachesResponse.message = "dummy data loaded"

    return itemCoachesResponse
  }

}