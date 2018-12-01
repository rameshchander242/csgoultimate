import axios from '@/plugins/axios'
import { getAuthToken } from '@/plugins/Auth'

export const state = () => ({
  packTabs: [],
  packs: [],
  myPacks: []
})

export const mutations = {
  SET_MASTER_PACKS: (state, packs) => {
    state.packs = packs
  },
  SET_MY_PACKS: (state, myPacks) => {
    state.myPacks = myPacks
  },
  SET_PACK_TABS: (state, packTabs) => {
    state.packTabs = packTabs
  },
  CURRENCY_USE(state, payload) {
    let packs = []
    state.packs.forEach((db_pack)=>{
        if(db_pack.id==payload.pack.id){
          if(payload.use == 'coins') {
            db_pack.use_coin = true
            db_pack.use_point = false
          } else {
            db_pack.use_coin = false
            db_pack.use_point = true
          }
        } 
        // Revision
        // else {
        //  db_pack.use_coin = false
        //  db_pack.use_point = false
        // }
        packs.push(db_pack)
      })
      state.packs = packs 
  },
  OPEN(state, payload) {
    let packs = []
    state.myPacks.forEach((db_pack)=>{
      if(db_pack.id==payload.pack.id){
          db_pack.open_ui = payload.action
      }
      packs.push(db_pack)
    })
    state.myPacks = packs 
  }
}

export const getters = {
  myPackTotal(state){
    return (state.myPacks.length > 0 ) ? state.myPacks.length : 0
  },
  getPacks(state){
    if(state.packs.length > 0 ){
      let UIPACKS = []
      state.packs.forEach((val) => {
        let pack = val
        if(pack.coinPrice <= 0){
          pack.use_coin = false
          pack.use_point = true
        }
        UIPACKS.push(pack)
      })
      return UIPACKS;
    }else{
      return [];
    }
  },
  getMyPacks(state){
    return (state.myPacks.length > 0 ) ? state.myPacks : []
  },
  getPackTabs(state){
    return (state.packTabs.length > 0 ) ? state.packTabs : []
  }
}

export const actions = {
  async getMasterPacks ({commit, store}, pack_tab) {
    let payload = { packTabId: pack_tab }
    let head_payload = { params: payload, headers: { Authorization: getAuthToken() } } 
    let storeData = []
    let masterPackResponse = await axios.get('/api/master-packs', head_payload)
    masterPackResponse = masterPackResponse.data

    if(masterPackResponse.status == true){
      masterPackResponse.data.forEach((pack) => {
        pack.imageUrl = (pack.imageUrl.match(/\.(jpeg|jpg|gif|png)$/) != null) ? pack.imageUrl : ''
        pack.pack_qty = 1
        pack.pack_buy = false
        pack.use_coin = true
        pack.use_point = false
        storeData.push(pack)
      })
    }
    commit('SET_MASTER_PACKS', storeData)
    return masterPackResponse
  },
  currencyUse ({commit, store}, paylod) {
    commit('CURRENCY_USE', paylod)
  },
  open({commit, store}, paylod) {
    commit('OPEN', paylod)
  },
  async buyPack ({commit, store}, paylod) {
     let head_payload = { headers: { Authorization: getAuthToken() } }
     let buyPackResponse = await axios.post(`/api/buy-packs`, paylod, head_payload)
     buyPackResponse = buyPackResponse.data
    return buyPackResponse
  },
  async getMyPacks ({commit, store}) {
    let head_payload = { headers: { Authorization: getAuthToken() } }
    let storeData = []
    let myPackResponse = await axios.get('/api/my-packs', head_payload)
    myPackResponse = myPackResponse.data
    if(myPackResponse.status == true){
      myPackResponse.data.forEach((pack) => {
        if(pack.masterPackData)
          pack.masterPackData.imageUrl = (pack.masterPackData.imageUrl.match(/\.(jpeg|jpg|gif|png)$/) != null) ? pack.masterPackData.imageUrl : ''
        pack.open_ui = false
        storeData.push(pack)
      })
    }
    commit('SET_MY_PACKS', storeData)
    return myPackResponse
  },
  async getPackTypes ({commit, store}) {
    let head_payload = { headers: { Authorization: getAuthToken() } }
    let packTypesResponse = await axios.get('/api/pack-tabs', head_payload)
    packTypesResponse = packTypesResponse.data
    if(packTypesResponse.status == true){
      commit('SET_PACK_TABS', packTypesResponse.data)
    } else {
      commit('SET_PACK_TABS', [])
    }
    return packTypesResponse
  }

}
