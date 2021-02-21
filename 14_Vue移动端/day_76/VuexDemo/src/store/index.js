import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    add (state) {
      state.count++
    },
    addN (state, step) {
      if (isNaN(step)) return alert('不符合数字')
      state.count += step
    },
    sub (state) {
      state.count--
    },
    subN (state, step) {
      if (isNaN(step)) return alert('不符合数字')
      state.count -= step
    },
    clear (state) {
      state.count = 0
    }
  },
  actions: {
    addAsync (context) {
      setTimeout(() => {
        context.commit('add')
      }, 1000)
    },
    addNAsync (context, step) {
      setTimeout(() => {
        context.commit('addN', step)
      }, 1000)
    },
    subAsync (context) {
      setTimeout(() => {
        context.commit('sub')
      }, 1000)
    },
    subNAsync (context, step) {
      setTimeout(() => {
        context.commit('addN', step)
      }, 1000)
    }
  },
  modules: {}
})
