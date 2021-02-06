import Vue from "vue";
import Vuex from "vuex";
import App from "./App.vue";
import router from "./router";
import shipStore from "./store";
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;
const store = new Vuex.Store(shipStore)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
