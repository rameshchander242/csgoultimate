import axios from '@/plugins/axios'
import { getAuthToken } from '@/plugins/Auth'

export const state = () => ({
  item_boostmaps: []
})

export const mutations = {
  SET_ITEM_COACHES: (state, item_boostmaps) => {
    state.item_boostmaps = item_boostmaps
  }
}

export const getters = {
  itemBoostMaps(state) {

    // Store data maniplation here for UI.. 
    if(1==1) {
      let UICards = []
      state.item_boostmaps.forEach((boostmap) => {
         let boostmap_info = {
          id: boostmap.id,
          teamName: '',
          teamLogo:'',
          countryName: '',
          countryLogo: '',
          formLevel: boostmap.formLevel,
          cardTypeName:'',
          backgroundUrl: '',
          pictureUrl: '',
          overallScore: 0,
          boostmapName: '',
          condition: boostmap.condition,
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
          newest: boostmap.createdAt
        }

        // Add variable here

        // check value
        if(boostmap.boostMapCardData) {
          let boostMapCardData = boostmap.boostMapCardData
          boostmap_info.backgroundUrl = boostMapCardData.image
          boostmap_info.boostPct = boostMapCardData.boostPct
          
          if(boostMapCardData.cardTypesData) {
            boostmap_info.cardTypeName = boostMapCardData.cardTypesData.label
          }

          if(boostMapCardData.rarityLevelsData) {
            boostmap_info.quickSellValue = boostMapCardData.rarityLevelsData.quickSellValue
          }
        }else{
          return;
        }

        if(boostmap.mapData) {
          boostmap_info.mapLabel = boostmap.mapData.label
        }
        UICards.push(boostmap_info)
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
          boostmapName: 'Esf',
          roleLabel: 'non',
          mapLabel: 'yes',
          boosterPercentage: 89,
          boosterTypeId: 'IGL',
          quickSellValue: 0,
          roleShortName: 'NYF'
        }]
    }
  },
  totalBoostMaps(state){
    return (state.item_boostmaps.length > 0 ) ? state.item_boostmaps.length : 0
  }
}

export const actions = {
  async getItemBoostMaps ({commit, store}) {
    let head_payload = { headers: { Authorization: getAuthToken() } }
    let itemBoostMapsResponse = await axios.get('/api/item-boost-map-cards', head_payload)
    itemBoostMapsResponse = itemBoostMapsResponse.data
    if(itemBoostMapsResponse.status == true){
      commit('SET_ITEM_COACHES', itemBoostMapsResponse.data)
    }
    itemBoostMapsResponse.status = true
    itemBoostMapsResponse.message = "dummy data loaded"

    return itemBoostMapsResponse
  }

}