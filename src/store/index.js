import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      username: '',
      userIdentity: ''
    }
  },
  getters: {
    user: state => state.user
  },
  mutations: {
    setUser (state, user) {
      state.user = user
    }
  },
  actions: {
    setUserInto ({ commit }, user) {
      commit('setUser', user)
    }
  },
  modules: {
  }
})
