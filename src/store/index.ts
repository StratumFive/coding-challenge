import Vue from "vue";
import Vuex from "vuex";
import { calculatePosition, Output } from "../utils/navigate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    output: {} as Output,
    bannedMoves: [] as Output[],
  },
  mutations: {
    setOutput(state, data) {
      Vue.set(state, "output", data);
    },
    addBannedMove(state, data: Output) {
      state.bannedMoves.push(data);
    },
  },
  actions: {
    calculateOutput(context, { gridEdge, ship }) {
      const result = calculatePosition(gridEdge, ship, context.state.bannedMoves);
      context.commit("setOutput", result);
      result.lost && context.commit("addBannedMove", result);
    },
  },
  getters: {
    outputValue: ({ output }) => {
      const { x, y, direction, lost } = output;
      const print = `${x} ${y} ${direction} ${lost ? "LOST" : ""}`;
      return direction ? print : "No output yet";
    },
  },
});
