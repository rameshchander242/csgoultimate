import axios from '@/plugins/axios'
import { getAuthToken } from '@/plugins/Auth'

export const state = () => ({
  item_marketplace: []
})

export const mutations = {
  SET_MARKETPLACE: (state, item_marketplace) => {
    state.item_marketplace = item_marketplace
  }
}

export const getters = {
  itemMarketplace: (state) => (cardType)=> {
    let itemData = [];
    if(cardType == 'player')
      itemData = getters.playersData(state.item_marketplace);
    else if(cardType == 'coach')
      itemData = getters.coachData(state.item_marketplace);
    else if(cardType == 'fitness')
      itemData = getters.fitnessData(state.item_marketplace);
    else if(cardType == 'contract')
      itemData = getters.contractData(state.item_marketplace);
    else if(cardType == 'boostMap')
      itemData = getters.boostMapData(state.item_marketplace);
    else if(cardType == 'boostRole')
      itemData = getters.boostRoleData(state.item_marketplace);
    else if(cardType == 'switchMap')
      itemData = getters.switchMapData(state.item_marketplace);
    else if(cardType == 'switchRole')
      itemData = getters.switchRoleData(state.item_marketplace);
    else if(cardType == 'boostTeam')
      itemData = getters.boostTeamData(state.item_marketplace);

    return itemData;
  },
  playersData(items){
    let UICards = []
    if(items.length)
      items.forEach((item) => {
        let item_info = {
          id: item.id,
          userCardId: item.userCardId,
          playerCardId: 0,
          userId: item.userId,
          marketValue: item.marketValue,
          purchased: item.purchased,
          boughtUser: item.boughtUser,
          cardType: item.cardType,
          teamName:'',
          teamLogo:'',
          countryName: '',
          countryLogo: '',
          formLevel: 0,
          cardTypeName:'',
          backgroundUrl: '',
          pictureUrl: '',
          overallScore: 0,
          playerName: '',
          condition: 0,
          roleLabel: '1',
          mapLabel: '',
          rifleScore: 0,
          clutchScore: 0,
          pistolScore: 0,
          awpScore: 0,
          entryScore: 0,
          iqScore: 0,
          quickSellValue: 0,
          roleShortName: '',
          newest: item.createdAt,
        }

        // check value
        if(item.userPlayerCardData) {
          let userPlayerCardData = item.userPlayerCardData
          item_info.playerCardId = userPlayerCardData.playerCardId
          item_info.condition = userPlayerCardData.condition
          item_info.formLevel = userPlayerCardData.formLevel
          if(userPlayerCardData.mapData) {
            item_info.mapLabel = userPlayerCardData.mapData.label
          }
          if(userPlayerCardData.playerCardData) {
            let playerCardData = userPlayerCardData.playerCardData
            item_info.backgroundUrl = playerCardData.backgroundUrl
            item_info.overallScore = playerCardData.overallScore
            item_info.rifleScore = playerCardData.rifleScore
            item_info.clutchScore = playerCardData.clutchScore
            item_info.pistolScore = playerCardData.pistolScore
            item_info.awpScore = playerCardData.awpScore
            item_info.entryScore = playerCardData.entryScore
            item_info.iqScore = playerCardData.iqScore
            if(playerCardData.cardTypesData) {
              item_info.cardTypeName = playerCardData.cardTypesData.label
            }
            if(playerCardData.rolesData) {
              item_info.roleLabel = playerCardData.rolesData.label
              item_info.roleShortName = playerCardData.rolesData.shortName
            }
            if(playerCardData.playersData){
              let playersData = playerCardData.playersData
              item_info.teamLogo = (playersData.teamData)? playersData.teamData.logoUrl : ''
              item_info.teamName = (playersData.teamData)? playersData.teamData.teamName : ''
              item_info.pictureUrl = playersData.pictureUrl
              item_info.playerName = playersData.playerName
              if(playersData.countryData){
                item_info.countryLogo = playersData.countryData.imageUrl
                item_info.countryName = playersData.countryData.countryName
              }
            }
          }
        }else{
          return;
        }
        UICards.push(item_info)
      })
      return UICards
  },
  coachData(items){
    let UICards = []
    if(items.length)
      items.forEach((item) => {
         let coach_info = {
          id: item.id,
          userCardId: item.userCardId,
          coachCardId: 0,
          userId: item.userId,
          marketValue: item.marketValue,
          purchased: item.purchased,
          boughtUser: item.boughtUser,
          cardType: item.cardType,
          teamName: '',
          teamLogo:'',
          countryName: '',
          countryLogo: '',
          formLevel: '',
          cardTypeName:'',
          backgroundUrl: '',
          pictureUrl: '',
          overallScore: 0,
          coachName: '',
          condition: '',
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
          newest: item.createdAt
        }

        if(item.userCoachCardData) {
          let userCoachCardData = item.userCoachCardData
          coach_info.condition = userCoachCardData.condition
          coach_info.formLevel = userCoachCardData.formLevel
          if(userCoachCardData.coachCardData) {
            let coachCardData = userCoachCardData.coachCardData
            coach_info.backgroundUrl = coachCardData.backgroundUrl
            coach_info.overallScore = coachCardData.overallScore
            coach_info.boosterPercentage = coachCardData.boostPct
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
          }
        }else{
          return;
        }
        UICards.push(coach_info)
      })
      return UICards
  },
  fitnessData(items){
    let UICards = []
    if(items.length)
      items.forEach((item) => {
         let fitness_info = {
          id: item.id,
          userCardId: item.userCardId,
          fintessCardId: 0,
          userId: item.userId,
          marketValue: item.marketValue,
          purchased: item.purchased,
          boughtUser: item.boughtUser,
          cardType: item.cardType,
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
          newest: item.createdAt
        }
        if(item.userFitnessCardData) {
          let userFitnessCardData = item.userFitnessCardData;
          if(userFitnessCardData.fitnessCardData) {
            let fitnessCardData = userFitnessCardData.fitnessCardData
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
        }else{
          return;
        }
        UICards.push(fitness_info)
      })
      return UICards
  }, 
  contractData(items){
    let UICards = []
    if(items.length)
      items.forEach((item) => {
         let contract_info = {
          id: item.id,
          userCardId: item.userCardId,
          contractCardId: 0,
          userId: item.userId,
          marketValue: item.marketValue,
          purchased: item.purchased,
          boughtUser: item.boughtUser,
          cardType: item.cardType,
          backgroundUrl: '',
          quickSellValue: 0,
          cardTypeName:'',
          additionalAmount: '',
          overallScore: 0,
          newest: item.createdAt,
        }

        if(item.userContractCardData) {
          let userContractCardData = item.userContractCardData;
          if(userContractCardData.contractCardData) {
            contract_info.contractCardId = userContractCardData.contractCardId
            let contractCardData = userContractCardData.contractCardData
            contract_info.backgroundUrl = contractCardData.image
            contract_info.overallScore = contract_info.additionalAmount = contractCardData.additionalAmount
            if(contractCardData.rarityLevelsData) {
              contract_info.quickSellValue = contractCardData.rarityLevelsData.quickSellValue
            }
            if(contractCardData.cardTypesData) {
              contract_info.cardTypeName = contractCardData.cardTypesData.label
            }
          }else{
            return;
          }
        }else{
          return;
        }
        UICards.push(contract_info)
      })
      return UICards
  }, 
  boostMapData(items){
    let UICards = []
    if(items.length)
      items.forEach((item) => {
         let boostmap_info = {
          id: item.id,
          userCardId: item.userCardId,
          boostMapCardId: 0,
          userId: item.userId,
          marketValue: item.marketValue,
          purchased: item.purchased,
          boughtUser: item.boughtUser,
          cardType: item.cardType,

          cardTypeName:'',
          backgroundUrl: '',
          overallScore: 0,
          quickSellValue: 0,
          newest: item.createdAt
        }
        if(item.userBoostMapCardData){
          let userBoostMapCardData = item.userBoostMapCardData;
          if(userBoostMapCardData.boostMapCardData) {
            let boostMapCardData = userBoostMapCardData.boostMapCardData
            boostmap_info.boostMapCardId = boostMapCardData.id
            boostmap_info.backgroundUrl = boostMapCardData.image
            boostmap_info.overallScore = boostmap_info.boostPct = boostMapCardData.boostPct
            
            if(boostMapCardData.cardTypesData) {
              boostmap_info.cardTypeName = boostMapCardData.cardTypesData.label
            }

            if(boostMapCardData.rarityLevelsData) {
              boostmap_info.quickSellValue = boostMapCardData.rarityLevelsData.quickSellValue
            }
          }else{
            return;
          }
        }else{
          return;
        }
        console.log('test');

        UICards.push(boostmap_info)
      })
      return UICards
  }, 
  boostRoleData(items){
    let UICards = []
    if(items.length)
      items.forEach((item) => {
         let boostrole_info = {
          id: item.id,
          userCardId: item.userCardId,
          boostRoleCardId: 0,
          userId: item.userId,
          marketValue: item.marketValue,
          purchased: item.purchased,
          boughtUser: item.boughtUser,
          cardType: item.cardType,

          cardTypeName:'',
          backgroundUrl: '',
          overallScore: 0,
          quickSellValue: 0,
          newest: item.createdAt
        }

        if(item.userBoostRoleCardData){
          let userBoostRoleCardData = item.userBoostRoleCardData;
          if(userBoostRoleCardData.boostRoleCardData) {
            let boostRoleCardData = userBoostRoleCardData.boostRoleCardData
            boostrole_info.boostRoleCardId = boostRoleCardData.id
            boostrole_info.backgroundUrl = boostRoleCardData.image
            boostrole_info.overallScore = boostrole_info.boostPct = boostRoleCardData.boostPct
            
            if(boostRoleCardData.cardTypesData) {
              boostrole_info.cardTypeName = boostRoleCardData.cardTypesData.label
            }

            if(boostRoleCardData.rarityLevelsData) {
              boostrole_info.quickSellValue = boostRoleCardData.rarityLevelsData.quickSellValue
            }
          }else{
            return;
          }
        }else{
          return;
        }
        UICards.push(boostrole_info)

      })
      return UICards
  }, 
  switchMapData(items){
    let UICards = []
    if(items.length)
      items.forEach((item) => {
         let switchmap_info = {
          id: item.id,
          userCardId: item.userCardId,
          switchMapCardId: 0,
          userId: item.userId,
          marketValue: item.marketValue,
          purchased: item.purchased,
          boughtUser: item.boughtUser,
          cardType: item.cardType,

          cardTypeName:'',
          backgroundUrl: '',
          overallScore: 0,
          quickSellValue: 0,
          newest: item.createdAt
        }
        if(item.userSwitchMapCardData){
          let userSwitchMapCardData = item.userSwitchMapCardData
          if(userSwitchMapCardData.switchMapCardData) {
            let switchMapCardData = userSwitchMapCardData.switchMapCardData
            switchmap_info.switchMapCardId = switchMapCardData.id
            switchmap_info.backgroundUrl = switchMapCardData.image
            switchmap_info.overallScore = switchmap_info.additionalAmount = switchMapCardData.additionalAmount
            if(switchMapCardData.cardTypesData) {
              switchmap_info.cardTypeName = switchMapCardData.cardTypesData.label
            }
            if(switchMapCardData.rarityLevelsData) {
              switchmap_info.quickSellValue = switchMapCardData.rarityLevelsData.quickSellValue
            }
          }else{
            return;
          }
        }else{
          return;
        }
        UICards.push(switchmap_info)

      })
      return UICards
  }, 
  switchRoleData(items){
    let UICards = []
    if(items.length)
      items.forEach((item) => {
         let switchrole_info = {
          id: item.id,
          userCardId: item.userCardId,
          switchRoleCardId: 0,
          userId: item.userId,
          marketValue: item.marketValue,
          purchased: item.purchased,
          boughtUser: item.boughtUser,
          cardType: item.cardType,

          cardTypeName:'',
          backgroundUrl: '',
          overallScore: 0,
          quickSellValue: 0,
          newest: item.createdAt
        }
        if(item.userSwitchRoleCardData){
          let userSwitchRoleCardData = item.userSwitchRoleCardData
          if(userSwitchRoleCardData.switchRoleCardData) {
            let switchRoleCardData = userSwitchRoleCardData.switchRoleCardData
            switchrole_info.switchRoleCardId = switchRoleCardData.id
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
        }else{
          return;
        }
        UICards.push(switchrole_info)

      })
      return UICards
  }, 
  boostTeamData(items){
    let UICards = []
    let teamboost_data = [];
    let team_boost_data = {};
    for (var key in items) {
      if(RegExp('_').exec(key.replace('boost_card_data_', ''))){
        team_boost_data[key] = items[key];
      }else{
        teamboost_data.push(team_boost_data);
        team_boost_data = items[key];
      }
    }
    teamboost_data.push(team_boost_data);
    teamboost_data.shift();
    if(teamboost_data.length)
      teamboost_data.forEach((item) => {
         let teamboost_info = {
          id: item.id,
          userCardId: item.userCardId,
          boostTeamCardId: 0,
          userId: item.userId,
          marketValue: item.marketValue,
          purchased: item.purchased,
          boughtUser: item.boughtUser,
          cardType: item.cardType,

          cardTypeName:'',
          backgroundUrl: '',
          overallScore: 0,
          quickSellValue: 0,
          boostPct1: '',
          boostPct2: '',
          boostPct3: '',
          boostPct1Label: '',
          boostPct2Label: '',
          boostPct3Label: '',
          newest: item.createdAt
        }
        if(item.userBoostTeamCardData){
          let userBoostTeamCardData = item.userBoostTeamCardData;
          if(userBoostTeamCardData.boostTeamCardData) {
            let boostTeamCardData = userBoostTeamCardData.boostTeamCardData
            teamboost_info.boostTeamCardId = boostTeamCardData.id
            teamboost_info.backgroundUrl = boostTeamCardData.image
            teamboost_info.additionalAmount = boostTeamCardData.boostPct1 + boostTeamCardData.boostPct2 + boostTeamCardData.boostPct3
            teamboost_info.boostPct1 = boostTeamCardData.boostPct1
            teamboost_info.boostPct2 = boostTeamCardData.boostPct2
            teamboost_info.boostPct3 = boostTeamCardData.boostPct3
            
            for(let i=1; i<4; i++){
              let b = 'boost_card_type_'+teamboost_info.id+'_'+i
              teamboost_info['boostPct'+i+'Label'] = item[b].label
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
        }else{
          return;
        }
        UICards.push(teamboost_info)
      })
      return UICards
  }

}

export const actions = {
  async fetchMarketPlace ({commit, store}, payload) {
    let head_payload = { headers: { Authorization: getAuthToken() } }
    let marketPlace = await axios.get('/api/market-place/'+payload.type, head_payload)
    marketPlace = marketPlace.data
    if(marketPlace.status == true){
      commit('SET_MARKETPLACE', marketPlace.data)
    }
    marketPlace.status = true
    return marketPlace
  },
  async marketSale({commit, store}, payload) {
    let head_payload = { headers: { Authorization: getAuthToken() } }
    let saleResponse = await axios.post('/api/market-place/add',payload, head_payload)
    saleResponse = saleResponse.data
    return saleResponse
  },
  async marketRemove({commit, store}, payload) {
    let head_payload = { headers: { Authorization: getAuthToken() } }
    let marketResponse = await axios.post('/api/market-place/remove',payload, head_payload)
    marketResponse = marketResponse.data
    return marketResponse
  },
  async marketBuy({commit, store}, payload) {
    let head_payload = { headers: { Authorization: getAuthToken() } }
    let marketResponse = await axios.post('/api/market-place/buy',payload, head_payload)
    marketResponse = marketResponse.data
    return marketResponse
  },
}