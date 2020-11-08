import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    finalShipPositions: [],
    gridHeight: 0,
    gridWidth: 0,
  },
  mutations: {
    addFinalShipPosition(state, { ship }) {
      state.finalShipPositions.push(ship)
    },
    setGridHeight(state, { height }) {
      state.gridHeight = height
    },
    setGridWidth(state, { width }) {
      state.gridWidth = width
    },
  },
})
