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
  actions: {
    _insertItem({ state, commit, dispatch }, payload) {
      return payload.request(payload.data).then(res => {
        // dispatch(`${payload.NAMESPACE}selectList`)
      }).finally(() => {
      })
    },
    _deleteList({ state, commit, dispatch }, payload) {
      return this._vm.$confirm("确定要删除所选数据？", "提示", { type: 'warning' }).then(() => {
        commit(`${payload.NAMESPACE}SET_LOADING`, true)
        return payload.request(payload.data).then(res => {
          dispatch(`${payload.NAMESPACE}selectList`)
        })
      })
    },
    _updateItem({ state, commit, dispatch }, payload) {
      commit(`${payload.NAMESPACE}SET_LOADING`, true)
      return payload.request(payload.data).then(res => {
        commit(`${payload.NAMESPACE}SET_INFO`, res.row)
      }).finally(() => {
        commit(`${payload.NAMESPACE}SET_LOADING`, false)
      })
    },
    _selectItem({ state, commit, dispatch }, payload) {
      commit(`${payload.NAMESPACE}SET_LOADING`, true)
      return payload.request(payload.data).then(res => {
        commit(`${payload.NAMESPACE}SET_INFO`, res.row)
      }).finally(() => {
        commit(`${payload.NAMESPACE}SET_LOADING`, false)
      })
    },
    _selectList({ state, rootState, commit, dispatch }, payload) {
      commit(`${payload.NAMESPACE}SET_LOADING`, true)
      return payload.request({
        ...payload.data,
        page: payload.NAMESPACE.split('/').slice(0, -1).reduce((total, key) => total[key], rootState).page,
        size: payload.NAMESPACE.split('/').slice(0, -1).reduce((total, key) => total[key], rootState).size
      }).then(res => {
        console.log(res);
        commit(`${payload.NAMESPACE}SET_LIST`, res.rows)
        commit(`${payload.NAMESPACE}SET_TOTAL`, res.total)
        commit(`${payload.NAMESPACE}SET_PAGE`, res.page)
        commit(`${payload.NAMESPACE}SET_SIZE`, res.size)
      }).finally(() => {
        commit(`${payload.NAMESPACE}SET_LOADING`, false)
      })
    },
  },
  getters,
  modules: {
    layout: require('./modules/layout')['default'],
    entry: require('./modules/entry')['default'],
    typecho: require('./modules/typecho')['default']
  },
  plugins: [
    // vuexLocal.plugin
  ]
});
