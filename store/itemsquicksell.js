import axios from '@/plugins/axios'
import { getAuthToken } from '@/plugins/Auth'
export const actions = {
  async sellItemQuick({commit, store}, payload) {
    let head_payload = { headers: { Authorization: getAuthToken() } }
    let itemQuickSellResponse = await axios.post('/api/item-quick-sell',payload, head_payload)
    itemQuickSellResponse = itemQuickSellResponse.data
    return itemQuickSellResponse
  },
}