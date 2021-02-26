import { shallowMount } from "@vue/test-utils";
import TextBasedSolution from "@/components/TextBasedSolution";

let wrapper;
beforeEach(() => {
  wrapper = shallowMount(TextBasedSolution);
});

describe("TextBasedSolution.vue", () => {
  it("renders a text-input element", () => {
    expect(wrapper.find("#text-input").exists()).toBe(true);
  });
});
