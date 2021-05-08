import Vue from 'vue'
import Vuex from 'vuex'
import {calculatePosition, Ship} from '../navigate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    output: 'CCC'
  },
  mutations: {
    setOutput(state, data) {
      state.output = data
    }
  },
  actions: {
    calculateOutput(context, {gridEdge, ship}) {
      const output = calculatePosition(gridEdge, ship)
      context.commit('setOutput', output)
    }
  },
  modules: {
  }
})
