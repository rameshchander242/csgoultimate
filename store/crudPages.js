import axios from '@/plugins/axios'
import { getAuthToken } from '@/plugins/Auth'

export const state = () => ({
  pageInfo: []
})

export const mutations = {
  SET_PAGE: (state, page) => {
    state.pageInfo = page
  }
}

export const getters = {
  pageData(state) {
    let pageInfo = state.pageInfo
    let page_info = {
      id: 0,
      pageLabel: 'Page Not Found',
      pageDescription: 'Sorry, Page Not Found',
    }
    if(pageInfo){
      page_info.id = pageInfo.id
      page_info.pageLabel = pageInfo.label
      page_info.pageDescription = pageInfo.description
    }

    return page_info
  }
}

export const actions = {
  async getPage ({commit, store}, pageId) {
    let head_payload = { headers: { Authorization: getAuthToken() } }
    let page_info = await axios.get('/api/pages/'+pageId, head_payload)
    page_info = page_info.data
    if(page_info.status == true){
      commit('SET_PAGE', page_info.data)
    }
    page_info = page_info.data
    return page_info
  }

}