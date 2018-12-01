import axios from '@/plugins/axios'
import { getAuthToken } from '@/plugins/Auth'

export const state = () => ({
  item_boostroles: []
})

export const mutations = {
  SET_ITEM_COACHES: (state, item_boostroles) => {
    state.item_boostroles = item_boostroles
  }
}

export const getters = {
  itemBoostRoles(state) {

    // Store data maniplation here for UI.. 
    if(1==1) {
      let UICards = []
      state.item_boostroles.forEach((boostrole) => {
         let boostrole_info = {
          id: boostrole.id,
          teamName: '',
          teamLogo:'',
          countryName: '',
          countryLogo: '',
          formLevel: boostrole.formLevel,
          cardTypeName:'',
          backgroundUrl: '',
          pictureUrl: '',
          overallScore: 0,
          boostroleName: '',
          condition: boostrole.condition,
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
          newest: boostrole.createdAt
        }

        // Add variable here

        // check value
        if(boostrole.boostRoleCardData) {
          let boostRoleCardData = boostrole.boostRoleCardData
          boostrole_info.backgroundUrl = boostRoleCardData.image
          boostrole_info.boostPct = boostRoleCardData.boostPct
          
          if(boostRoleCardData.cardTypesData) {
            boostrole_info.cardTypeName = boostRoleCardData.cardTypesData.label
          }

          if(boostRoleCardData.rarityLevelsData) {
            boostrole_info.quickSellValue = boostRoleCardData.rarityLevelsData.quickSellValue
          }
        }else{
          return;
        }

        if(boostrole.mapData) {
          boostrole_info.mapLabel = boostrole.mapData.label
        }
        UICards.push(boostrole_info)
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
          boostroleName: 'Esf',
          roleLabel: 'non',
          mapLabel: 'yes',
          boosterPercentage: 89,
          boosterTypeId: 'IGL',
          quickSellValue: 0,
          roleShortName: 'NYF'
        }]
    }
  },
  totalBoostRoles(state){
    return (state.item_boostroles.length > 0 ) ? state.item_boostroles.length : 0
  }
}

export const actions = {
  async getItemBoostRoles ({commit, store}) {
    let head_payload = { headers: { Authorization: getAuthToken() } }
    let itemBoostRolesResponse = await axios.get('/api/item-boost-role-cards', head_payload)
    itemBoostRolesResponse = itemBoostRolesResponse.data
    if(itemBoostRolesResponse.status == true){
      commit('SET_ITEM_COACHES', itemBoostRolesResponse.data)
    }
    itemBoostRolesResponse.status = true
    itemBoostRolesResponse.message = "dummy data loaded"

    return itemBoostRolesResponse
  }

}