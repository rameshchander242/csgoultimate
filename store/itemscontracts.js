import axios from '@/plugins/axios'
import { getAuthToken } from '@/plugins/Auth'

export const state = () => ({
  item_contracts: []
})

export const mutations = {
  SET_ITEM_COACHES: (state, item_contracts) => {
    state.item_contracts = item_contracts
  }
}

export const getters = {
  itemContracts(state) {

    // Store data maniplation here for UI.. 
    if(1==1) {
      let UICards = []
      state.item_contracts.forEach((contract) => {
         let contract_info = {
          id: contract.id,
          teamName: '',
          teamLogo:'',
          countryName: '',
          countryLogo: '',
          formLevel: contract.formLevel,
          cardTypeName:'',
          backgroundUrl: '',
          pictureUrl: '',
          overallScore: 0,
          contractName: '',
          condition: contract.condition,
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
          newest: contract.createdAt
        }

        // Add variable here

        // check value
        if(contract.contractCardData) {
          let contractCardData = contract.contractCardData
          contract_info.backgroundUrl = contractCardData.image
          contract_info.additionalAmount = contractCardData.additionalAmount
          
          if(contractCardData.cardTypesData) {
            contract_info.cardTypeName = contractCardData.cardTypesData.label
          }

          if(contractCardData.rarityLevelsData) {
            contract_info.quickSellValue = contractCardData.rarityLevelsData.quickSellValue
          }
        }else{
          return;
        }

        if(contract.mapData) {
          contract_info.mapLabel = contract.mapData.label
        }
        UICards.push(contract_info)
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
          contractName: 'Esf',
          roleLabel: 'non',
          mapLabel: 'yes',
          boosterPercentage: 89,
          boosterTypeId: 'IGL',
          quickSellValue: 0,
          roleShortName: 'NYF'
        }]
    }
  },
  totalContracts(state){
    return (state.item_contracts.length > 0 ) ? state.item_contracts.length : 0
  }
}

export const actions = {
  async getItemContracts ({commit, store}) {
    let head_payload = { headers: { Authorization: getAuthToken() } }
    let itemContractsResponse = await axios.get('/api/item-contract-cards', head_payload)
    itemContractsResponse = itemContractsResponse.data
    if(itemContractsResponse.status == true){
      commit('SET_ITEM_COACHES', itemContractsResponse.data)
    }
    itemContractsResponse.status = true
    itemContractsResponse.message = "dummy data loaded"

    return itemContractsResponse
  }

}