import { setToken, getToken } from '@/utils/storage'
const state = {
  tokenInfo: getToken()
}
const mutations = {
  setTokenInfo(state, tokenObj) {
    state.tokenInfo = tokenObj
    setToken(tokenObj)
  }
}
const actions = {}
const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
