import { createStore } from 'vuex'

const store = createStore({
  state: {
    user: null,
    records: []
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    logout(state) {
      state.user = null
    },
    setRecords(state, record) {
      state.records = [...state.records, record]
    },
  },
  actions: {
    login({ commit }, user) {
      commit('setUser', user)
    },
    logout({ commit }) {
      commit('logout')
    },
    records({ commit }, record) {
      commit('setRecords', record)
    },
  },

  getters: {
    user: (state) => state.user,
    records: (state) => state.records,
  }
})

export default store
