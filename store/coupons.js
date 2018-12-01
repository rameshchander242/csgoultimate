import axios from '@/plugins/axios'
import { getAuthToken } from '@/plugins/Auth'

export const state = () => ({
	show: false
})

export const mutations = {
 DIALOG: function (state, data) {
    state.show = data
  },
}

export const getters = {
 	dialog(state) {
 		return state.show
 	}
}

export const actions = {
	showDialog({commit, store}, flag){
		commit('DIALOG', flag)
	},
	async redeemCoupon ({commit, store}, paylod) {
		let head_payload = { headers: { Authorization: getAuthToken() } }
		let redeemCouponResponse = await axios.post(`/api/redeem-coupons`, paylod, head_payload)
		redeemCouponResponse = redeemCouponResponse.data
		if(redeemCouponResponse.status){
		  // commit('', )
		}
		return redeemCouponResponse
	}
}