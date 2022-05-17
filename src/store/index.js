import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from 'vuex-persist'
import getters from './getters'
Vue.use(Vuex);

const vuexLocal = new VuexPersist({
  storage: window.localStorage

})

export default new Vuex.Store({
  state: {},
  mutations: {
  },
  actions: {},
  getters,
  modules: {
    layout: require('./modules/layout')['default'],
    entry: require('./modules/entry')['default']
  },
  plugins: [
    // vuexLocal.plugin
  ]
});
