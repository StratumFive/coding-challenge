import Vue from "vue";
import Vuex from "vuex";
import { calculatePosition, Output } from "../navigate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    output: "",
    bannedMoves: [] as Output[]
  },
  mutations: {
    setOutput(state, data) {
      state.output = data;
    },
    addBannedMove(state, data : Output) {
      state.bannedMoves.push(data)
    }
  },
  actions: {
    calculateOutput(context, { gridEdge, ship }) {
      const result = calculatePosition(gridEdge, ship, context.state.bannedMoves);
      const output = `${result.x} ${result.y} ${result.direction} ${result.lost ? 'LOST' : ''}`
      context.commit('setOutput', output)
      result.lost && context.commit('addBannedMove', result)
    },
  },
  modules: {},
});
