export const strict = false

import axios from '@/plugins/axios.js'
import { getAuthToken } from '@/plugins/Auth.js'

export const state = () => ({
  authUser: null,
  token: null,
  message: '',
  banMessage: '',
  dialog_info: {
    show: false,
    title: '',
    content: ''
  },
  show: false,
  sideHide: false,
  quickSellDisable: false,
  comingSoon: [],
  countList: {},
})

export const mutations = {
  SET_USER: function (state, user) {
    if(user.users && user.users.banned){
      state.banMessage = 'Your Account Banned.';
      return;
    }else{
      state.banMessage = '';
    }
    state.authUser = user.users
    state.token = user.token
    state.message = user.message
  },
  UPDATE_USER: function (state, data) {
    state.authUser = data
  },
  UPDATE_BALANCE: (state, payload) => {
    let userData = state.authUser
    if(payload.coinsBalance){
      userData.coinsBalance = payload.coinsBalance
    }
    if(payload.pointsBalance){
      userData.pointsBalance = payload.pointsBalance
    }
  },
  UPDATE_TOS: (state, payload) => {
    let userData = state.authUser
    if(payload){
      userData.tos = payload.tos
    }
    state.authUser = userData
  },
  INFO_DIALOG: (state, payload) => {
    state.dialog_info.show = payload.show
    state.dialog_info.title = payload.title
    state.dialog_info.content = payload.content
  },
  DIALOG: function (state, data) {
    state.show = data
  },

  COMING_SOON: function(state, data){
    state.comingSoon = data;
  },

  COUNT_LIST: function(state, data){
    state.countList = data;
  },
}

export const getters = {
  token (state) {
    return (state.token) ? state.token : ''
  },
  isLoggedIn(state) {
     return (state.token) ? true : false
  },
  getUserInfo(state){
    return state.authUser
  },
  infoDialog(state) {
    return state.dialog_info
  },
  dialog(state) {
    return state.show
  },

  get_comingSoon: (state) => (slug)=>{
    let page_content = {};
    let comingSoon = state.comingSoon;
    if(comingSoon[0])
      comingSoon.forEach((val) => {
        if(val.slug == slug)
          page_content = val;
      });
    return page_content;
  },
  get_AllcomingSoon(state){
    return state.comingSoon;
  } 
}

export const actions = {
  nuxtServerInit ({ commit }, { req }) {
    if (req.session && req.user) {
      commit('SET_USER', req.user)
    }
  },
  async userUpdate ({commit, store}) {
    let head_payload = { headers: { Authorization: getAuthToken() } }
    let userResponse = await axios.get(`/api/steam-users`, head_payload)
     userResponse = userResponse.data
    if(userResponse.status == true){
      commit('UPDATE_USER', userResponse.data)
    } else {
      commit('SET_USER', {
        authUser: null,
        token: null,
        message: ''
      })
    }
    return userResponse
  },
  updateInfo({commit, store}, paylod) {
      commit('UPDATE_USER', paylod)
  },
  updateBalance({commit, store}, paylod) {
    commit('UPDATE_BALANCE', paylod)
  },
  updateTOS({commit, store}, paylod) {
    commit('UPDATE_TOS', paylod)
  },
  showInfoDialog({commit, store}, info){
    commit('INFO_DIALOG', info)
  },
  showDialog({commit, store}, flag){
    commit('DIALOG', flag)
  },
  async updateUserInfo ({commit, store}, paylod) {
    let head_payload = { headers: { Authorization: getAuthToken() } }
    let userInfoResponse = await axios.put(`/api/steam-users`, paylod, head_payload)
    userInfoResponse = userInfoResponse.data
    if(userInfoResponse.status){
      // commit('', )
    }
    return userInfoResponse
  },
  async acceptTOS({commit, store}) {
    let head_payload = { headers: { Authorization: getAuthToken() } }
    let tosResponse = await axios.get('/api/steam-users/tos', head_payload)
    tosResponse = tosResponse.data
    return tosResponse
  },
  async checkMaintenance({commit, store}) {
    let head_payload = { headers: { Authorization: getAuthToken() } }
    let maintain = await axios.get('/api/check-maintain', head_payload)
    maintain = maintain.data
    //maintain.data.active = false;
    return maintain
  },
  async getComingSoon({commit, store}) {
    let head_payload = { headers: { Authorization: getAuthToken() } }
    let pageContent = await axios.get('/api/coming-soon-pages', head_payload)
    pageContent = pageContent.data
    commit('COMING_SOON', pageContent.data);
    return pageContent
  },
  async getCardCountList({commit, store}) {
    let head_payload = { headers: { Authorization: getAuthToken() } }
    let countList = await axios.get('/api/card-count-list', head_payload)
    countList = countList.data
    commit('COUNT_LIST', countList.data);
    return countList
  },
}