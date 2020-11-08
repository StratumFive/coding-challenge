import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    finalShipPositions: [],
    xMax: 0,
    yMax: 0,
  },
  getters: {
    getLostShips: (state) => (id) => {
      return state.finalShipPositions.filter(
        ({ id: shipId, isLost }) => isLost && shipId < id
      )
    },
  },
  mutations: {
    addFinalShipPosition(state, { ship }) {
      state.finalShipPositions.push(ship)
    },
    setXMax(state, { xMax }) {
      state.xMax = xMax
    },
    setYMax(state, { yMax }) {
      state.yMax = yMax
    },
  },
})
