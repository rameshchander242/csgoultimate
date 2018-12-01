import axios from '@/plugins/axios'
import { getAuthToken } from '@/plugins/Auth'

export const state = () => ({
  item_switchroles: []
})

export const mutations = {
  SET_ITEM_COACHES: (state, item_switchroles) => {
    state.item_switchroles = item_switchroles
  }
}

export const getters = {
  itemSwitchRoles(state) {

    // Store data maniplation here for UI.. 
    if(1==1) {
      let UICards = []
      state.item_switchroles.forEach((switchrole) => {

         let switchrole_info = {
          id: switchrole.id,
          teamName: '',
          teamLogo:'',
          countryName: '',
          countryLogo: '',
          formLevel: switchrole.formLevel,
          cardTypeName:'',
          backgroundUrl: '',
          pictureUrl: '',
          overallScore: 0,
          switchroleName: '',
          condition: switchrole.condition,
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
          newest: switchrole.createdAt
        }

        // Add variable here

        // check value
        if(switchrole.switchRoleCardData) {
          let switchRoleCardData = switchrole.switchRoleCardData
          switchrole_info.backgroundUrl = switchRoleCardData.image
          switchrole_info.additionalAmount = switchRoleCardData.additionalAmount
          
          if(switchRoleCardData.cardTypesData) {
            switchrole_info.cardTypeName = switchRoleCardData.cardTypesData.label
          }

          if(switchRoleCardData.rarityLevelsData) {
            switchrole_info.quickSellValue = switchRoleCardData.rarityLevelsData.quickSellValue
          }
        }else{
          return;
        }

        if(switchrole.mapData) {
          switchrole_info.mapLabel = switchrole.mapData.label
        }
        
        UICards.push(switchrole_info)
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
          switchroleName: 'Esf',
          roleLabel: 'non',
          mapLabel: 'yes',
          boosterPercentage: 89,
          boosterTypeId: 'IGL',
          quickSellValue: 0,
          roleShortName: 'NYF'
        }]
    }
  },
  totalSwitchRoles(state){
    return (state.item_switchroles.length > 0 ) ? state.item_switchroles.length : 0
  }
}

export const actions = {
  async getItemSwitchRoles ({commit, store}) {
    let head_payload = { headers: { Authorization: getAuthToken() } }
    let itemSwitchRolesResponse = await axios.get('/api/item-switch-role-cards', head_payload)
    itemSwitchRolesResponse = itemSwitchRolesResponse.data
    if(itemSwitchRolesResponse.status == true){
      commit('SET_ITEM_COACHES', itemSwitchRolesResponse.data)
    }
    itemSwitchRolesResponse.status = true
    itemSwitchRolesResponse.message = "dummy data loaded"

    return itemSwitchRolesResponse
  }

}