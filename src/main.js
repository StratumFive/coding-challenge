import Vue from "vue";
import Vuex from "vuex";
import App from "./App.vue";
import router from "./router";
import shipStore from "./store";

Vue.config.productionTip = false;
const store = new Vuex.Store(shipStore)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
