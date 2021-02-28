import Vue from "vue";
import Vuetify from "vuetify";
import { createLocalVue, mount } from "@vue/test-utils";
import TextBasedSolution from "@/components/TextBasedSolution";

Vue.use(Vuetify); // To prevent errors on vuetify components similar to: https://stackoverflow.com/questions/51990753/vue-js-vuetify-issue-running-my-first-unit-test-with-jest and https://github.com/vuetifyjs/vuetify/issues/4964
describe("TextBasedSolution.vue", () => {
  const localVue = createLocalVue();
  let wrapper;
  beforeEach(() => {
    wrapper = mount(TextBasedSolution, {
      localVue,
    });
  });
  it("renders a text-input element and a button", () => {
    expect(wrapper.find("#text-input").exists()).toBe(true);
    expect(wrapper.find("#calculate-button").exists()).toBe(true);
  });
  it.only("calculates the ending positions of the ships", () => {
    wrapper.setData({
      commandInput:
        "5 3 \n 1 1 E \n RFRFRFRF \n\n 3 2 N \n FRRFLLFFRRFLL \n\n 0 3 W \n LLFFFLFLFL",
    });
    wrapper.vm.calculateShips();
    expect(wrapper.vm.shipsOutput).toBe("1 1 E\n3 3 N LOST\n2 3 S");
  });
});
