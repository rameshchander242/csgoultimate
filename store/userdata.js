import axios from '@/plugins/axios'
import { getAuthToken } from '@/plugins/Auth'

export const state = () => ({
  userData: {},
  notifications: [],
})

export const mutations = {
  SET_MASTER_UserData: (state, userData) => {
    state.userData = userData
  },
  SET_MASTER_Notifactions: (state, notifications) => {
    state.notifications = notifications;
    // let notifications_ = [];
    // for(let  i=1; i<=10; i++)
    //   notifications_.push( { id:i, description:'Wheel on purchase pack 150 coins Debit', createdAt: i+", Oct 2018"} );
    // state.notifications = notifications_;
  },
  DELETE_NOTIFICATION(state, payload) {
    let packs = []
    if(payload.id!='all'){
      state.notifications.forEach((db_pack)=>{
        if(db_pack.id==payload.id){
          return
        }
        packs.push(db_pack)
      })
    }
    state.notifications = packs 
  }
}

export const getters = {
  getUserData(state){
    let totalPacks = state.userData.totalPacks;
    let totalSoldItems = state.userData.soldItems;
    let openedPacks = state.userData.openedPacks;
    let totalItems = state.userData.totalItems;
    let coinsHistory = state.userData.coinsHistory
    let pointsHistory = state.userData.pointsHistory
    return{
      userTotals:[
        { image:"profile/list.png", label:"Total Items", totalItems: totalItems },
        { image:"profile/box-pack.png", label:"Total Packs", totalItems: totalPacks },
        { image:"profile/box.png", label:"Total Pack Opened", totalItems: openedPacks },
        { image:"profile/bank.png", label:"Total Items Sold", totalItems: totalSoldItems },
      ],
      coinsHistory: coinsHistory,
      pointsHistory: pointsHistory,
    }
  },
  getNotifications(state){
    let notifications = state.notifications
    return{
      notifications:notifications
    }
  }
}

export const actions = {
  async fetchUserData ({commit, store}) {
    let head_payload = { headers: { Authorization: getAuthToken() } }
    let userdata = await axios.get('/api/history', head_payload)
    userdata = userdata.data
    commit('SET_MASTER_UserData', userdata.data)
    return userdata
  },
  async fetchNotifications ({commit, store}) {
    let head_payload = { headers: { Authorization: getAuthToken() } } 
    let notifications = await axios.get('/api/notifications', head_payload)
    notifications = notifications.data
    commit('SET_MASTER_Notifactions', notifications.data)
    return notifications
  },
  async deleteNotification ({commit, store}, payload) {
    commit('DELETE_NOTIFICATION', payload);
    let head_payload = { headers: { Authorization: getAuthToken() } }
    let notifications = await axios.post('/api/notifications-delete', payload, head_payload)
    notifications = notifications.data
    return notifications
  },
  async deleteNotificationAll ({commit, store}, payload) {
    commit('DELETE_NOTIFICATION', {id: 'all'});
    let head_payload = { headers: { Authorization: getAuthToken() } }
    let notifications = await axios.post('/api/notifications-delete-all', payload, head_payload)
    notifications = notifications.data
    return notifications
  },
}
