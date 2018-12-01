import axios from '@/plugins/axios'
import { getAuthToken } from '@/plugins/Auth'

export const state = () => ({
  item_switchmaps: []
})

export const mutations = {
  SET_ITEM_COACHES: (state, item_switchmaps) => {
    state.item_switchmaps = item_switchmaps
  }
}

export const getters = {
  itemSwitchMaps(state) {

    // Store data maniplation here for UI.. 
    if(1==1) {
      let UICards = []
      state.item_switchmaps.forEach((switchmap) => {


         let switchmap_info = {
          id: switchmap.id,
          teamName: '',
          teamLogo:'',
          countryName: '',
          countryLogo: '',
          formLevel: switchmap.formLevel,
          cardTypeName:'',
          backgroundUrl: '',
          pictureUrl: '',
          overallScore: 0,
          switchmapName: '',
          condition: switchmap.condition,
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
          newest: switchmap.createdAt
        }

        // Add variable here

        // check value
        if(switchmap.switchMapCardData) {
          let switchMapCardData = switchmap.switchMapCardData
          switchmap_info.backgroundUrl = switchMapCardData.image
          switchmap_info.additionalAmount = switchMapCardData.additionalAmount
          
          if(switchMapCardData.cardTypesData) {
            switchmap_info.cardTypeName = switchMapCardData.cardTypesData.label
          }

          if(switchMapCardData.rarityLevelsData) {
            switchmap_info.quickSellValue = switchMapCardData.rarityLevelsData.quickSellValue
          }
        }else{
          return;
        }

        if(switchmap.mapData) {
          switchmap_info.mapLabel = switchmap.mapData.label
        }
        UICards.push(switchmap_info)
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
          switchmapName: 'Esf',
          roleLabel: 'non',
          mapLabel: 'yes',
          boosterPercentage: 89,
          boosterTypeId: 'IGL',
          quickSellValue: 0,
          roleShortName: 'NYF'
        }]
    }
  },
  totalSwitchMaps(state){
    return (state.item_switchmaps.length > 0 ) ? state.item_switchmaps.length : 0
  }
}

export const actions = {
  async getItemSwitchMaps ({commit, store}) {
    let head_payload = { headers: { Authorization: getAuthToken() } }
    let itemSwitchMapsResponse = await axios.get('/api/item-switch-map-cards', head_payload)
    itemSwitchMapsResponse = itemSwitchMapsResponse.data
    if(itemSwitchMapsResponse.status == true){
      commit('SET_ITEM_COACHES', itemSwitchMapsResponse.data)
    }
    itemSwitchMapsResponse.status = true
    itemSwitchMapsResponse.message = "dummy data loaded"

    return itemSwitchMapsResponse
  }

}