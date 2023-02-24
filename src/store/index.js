import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from 'vuex-persist'
import getters from './getters'
Vue.use(Vuex);

const vuexLocal = new VuexPersist({
  storage: window.sessionStorage

})
export const state = {
  loading: false,
  list: [],
  tree: [],
  total: 0,
  page: 1,
  size: 10,
  info: null,
  root: null,
  distinct: {},
}
export const mutations = {
  SET(state, payload = {}) {
    for (let key in payload) {
      eval(`state['${key.split(".").join('\'][\'')}'] = payload[key]`);
    }
  },
  CONCAT(state, payload) { },
  SET_LOADING(state, payload) {
    state.loading = payload === false ? false : true;
  },
  SET_LIST(state, payload) {
    state.list = payload;
  },
  SET_TREE(state, payload) {
    state.tree = { ...state.tree, ...payload }
  },
  SET_INFO(state, payload) {
    state.info = payload
  },
  SET_ROOT(state, payload) {
    state.root = payload
  },
  SET_TOTAL(state, payload) {
    state.total = payload
  },
  SET_PAGE(state, payload) {
    state.page = payload
  },
  SET_SIZE(state, payload) {
    state.size = payload
  },
  SET_DISTINCT(state, payload) {
    state.distinct = { ...state.distinct, ...payload }
  },
}
export const actions = {
  _insertItem({ state, commit, dispatch }, payload) {
    return payload.request(payload.data).then(res => {
      // dispatch(`${payload.NAMESPACE}selectList`)
    }).finally(() => {
    })
  },
  _deleteItem({ state, commit, dispatch }, payload) {
    return this._vm.$confirm("确定要删除该数据？", "提示", { type: 'warning' }).then(() => {
      commit(`${payload.NAMESPACE}SET_LOADING`, true)
      return payload.request(payload.data).then(res => {
        dispatch(`${payload.NAMESPACE}selectList`)
      })
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
    // commit(`${payload.NAMESPACE}SET_LOADING`, true)
    return payload.request(payload.data).then(res => {
      // commit(`${payload.NAMESPACE}SET_INFO`, res.row)
    }).finally(() => {
      // commit(`${payload.NAMESPACE}SET_LOADING`, false)
    })
  },
  _selectItem({ state, commit, dispatch }, payload) {
    // commit(`${payload.NAMESPACE}SET_LOADING`, true)
    return payload.request(payload.data).then(res => {
      if (payload.data._root === true) {
        // commit(`${payload.NAMESPACE}SET_ROOT`, res.row)
      } else {
        // commit(`${payload.NAMESPACE}SET_INFO`, res.row)
      }
      return Promise.resolve(res);
    }).finally(() => {
      // commit(`${payload.NAMESPACE}SET_LOADING`, false)
    })
  },
  _selectList({ state, rootState, commit, dispatch }, payload = {}) {
    // commit(`${payload.NAMESPACE}SET_LOADING`, true)
    return payload.request({
      ...payload.data,
      page: payload.data?.page || payload.NAMESPACE.split('/').slice(0, -1).reduce((total, key) => total[key], rootState).page,
      size: payload.data?.size || payload.NAMESPACE.split('/').slice(0, -1).reduce((total, key) => total[key], rootState).size
    }).then(res => {
      // commit(`${payload.NAMESPACE}SET_LIST`, res.rows)
      // commit(`${payload.NAMESPACE}SET_TOTAL`, res.total)
      // commit(`${payload.NAMESPACE}SET_PAGE`, res.page)
      // commit(`${payload.NAMESPACE}SET_SIZE`, res.size)
      return Promise.resolve(res);
    }).finally(() => {
      // commit(`${payload.NAMESPACE}SET_LOADING`, false)
    })
  },

  _selectTree({ state, rootState, commit, dispatch }, payload = {}) {
    // commit(`${payload.NAMESPACE}SET_LOADING`, true)
    return payload.request({
      ...payload.data,
    }).then(res => {
      commit(`${payload.NAMESPACE}SET_TREE`, { [Object.keys(payload.data).reduce((total, item, index) => total + (index === 0 ? '' : '_') + `${item}_${payload.data[item]}`, '')]: res })
      // commit(`${payload.NAMESPACE}SET_TOTAL`, res.total)
      // commit(`${payload.NAMESPACE}SET_TREE`, { [payload.data.column]: res })
      return Promise.resolve(res);
    }).finally(() => {
      // commit(`${payload.NAMESPACE}SET_LOADING`, false)
    })
  },
  _selectDistinct({ state, rootState, commit, dispatch }, payload = {}) {
    // commit(`${payload.NAMESPACE}SET_LOADING`, true)
    return payload.request({
      ...payload.data,
    }).then(res => {
      commit(`${payload.NAMESPACE}SET_DISTINCT`, { [payload.data.column]: res })
      return Promise.resolve(res);
    }).finally(() => {
      // commit(`${payload.NAMESPACE}SET_LOADING`, false)
    })
  },
}
export default new Vuex.Store({
  state: {},
  mutations: {
  },
  actions,
  getters,
  modules: {
    layout: require('./modules/layout')['default'],
    entry: require('./modules/entry')['default'],
    typecho: require('./modules/typecho')['default']
  },
  plugins: [
    vuexLocal.plugin
  ]
});
