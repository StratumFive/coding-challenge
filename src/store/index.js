import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    gridHeight: 0,
    gridWidth: 0,
  },
  mutations: {
    setGridHeight(state, { height }) {
      state.gridHeight = height
    },
    setGridWidth(state, { width }) {
      state.gridWidth = width
    },
  },
})
