import axios from '@/plugins/axios'
import { getAuthToken } from '@/plugins/Auth'

export const state = () => ({
  item_fitness: []
})

export const mutations = {
  SET_ITEM_FITNESSES: (state, item_fitness) => {
    state.item_fitness = item_fitness
  }
}

export const getters = {
  itemFitness(state) {

    // Store data maniplation here for UI.. 
    if(1==1) {
      let UICards = []
      state.item_fitness.forEach((fitness) => {
         let fitness_info = {
          id: fitness.id,
          teamName: '',
          teamLogo:'',
          countryName: '',
          countryLogo: '',
          formLevel: '',
          cardTypeName:'',
          backgroundUrl: '',
          pictureUrl: '',
          overallScore: 0,
          fitnessName: '',
          roleLabel: '',
          mapLabel: '',
          boosterPercentage: 0,
          boosterTypeId: '',
          quickSellValue: 0,
          roleShortName: '',
          newest: fitness.createdAt
        }

        // Add variable here

        // check value
        if(fitness.fitnessCardData) {
          let fitnessCardData = fitness.fitnessCardData
          fitness_info.backgroundUrl = fitnessCardData.image
          fitness_info.additionAmount = fitnessCardData.additionAmount
          

          if(fitnessCardData.rarityLevelsData){
            fitness_info.quickSellValue = fitnessCardData.rarityLevelsData.quickSellValue
            fitness_info.formLevel = fitnessCardData.rarityLevelsData.level
          }

          if(fitnessCardData.cardTypesData) {
            fitness_info.cardTypeName = fitnessCardData.cardTypesData.label
          }
        }else{
          return;
        }

        if(fitness.mapData) {
          fitness_info.mapLabel = fitness.mapData.label
        }
        UICards.push(fitness_info)
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
          fitnessName: 'Esf',
          roleLabel: 'non',
          mapLabel: 'yes',
          boosterPercentage: 89,
          boosterTypeId: 'IGL',
          quickSellValue: 0,
          roleShortName: 'NYF'
        }]
    }
  },
  totalFitness(state){
    return (state.item_fitness.length > 0 ) ? state.item_fitness.length : 0
  }
}

export const actions = {
  async getItemFitness ({commit, store}) {
    let head_payload = { headers: { Authorization: getAuthToken() } }
    let itemFitnessResponse = await axios.get('/api/item-fitness', head_payload)
    itemFitnessResponse = itemFitnessResponse.data
    if(itemFitnessResponse.status == true){
      commit('SET_ITEM_FITNESSES', itemFitnessResponse.data)
    }
    itemFitnessResponse.status = true
    itemFitnessResponse.message = "dummy data loaded"

    return itemFitnessResponse
  }

}