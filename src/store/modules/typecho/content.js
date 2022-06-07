import { select_typecho_content_list, delete_typecho_content_list, delete_typecho_content_item, insert_typecho_content_item, select_typecho_content_item, update_typecho_content_item, select_typecho_content_distinct } from '@/apis/typecho/content'
import { state, mutations, actions } from '@/store';
import Mock from 'mockjs'
export const MOCK_KEY = 'mock'
export const NAMESPACE = 'typecho/content/'
export class TypechoContent {
  constructor(info = {}) {
    // this.id = info === MOCK_KEY ? Mock.Random.id() : info.id;
    this.title = info === MOCK_KEY ? Mock.Random.sentence() : info.title;
    this.slug = info === MOCK_KEY ? Mock.Random.string() : info.slug;
    this.type = info === MOCK_KEY ? Mock.Random.word() : info.type;
    this.text_content = info === MOCK_KEY ? Mock.Random.paragraph() : info.description;
  }
}
export default {
  namespaced: true,
  state: {
    ...state
  },
  mutations: {
    ...mutations,
  },
  actions: {
    insertItem({ state, commit, dispatch, rootState }, payload) {
      return dispatch('_insertItem', {
        NAMESPACE,
        request: insert_typecho_content_item,
        data: { ...payload, parent: rootState.typecho.branch.info?.cid || payload.parent }
      }, {
        root: true
      })
    },
    selectList({ state, dispatch, rootState }, payload) {
      return dispatch('_selectList', {
        NAMESPACE,
        request: select_typecho_content_list,
        data: { ...payload, root: rootState.typecho.branch.info?.cid || payload.parent }
      }, {
        root: true
      })
    },
    selectItem({ state, commit, dispatch }, payload) {
      return dispatch('_selectItem', {
        NAMESPACE,
        request: select_typecho_content_item,
        data: payload
      }, {
        root: true
      })
    },
    selectDistinct({ dispatch, rootState }, payload) {
      return dispatch('_selectDistinct', {
        NAMESPACE,
        request: select_typecho_content_distinct,
        data: { ...payload, root: rootState.typecho.branch.info?.cid || payload.parent }
      }, {
        root: true
      })
    },
    deleteList({ state, commit, dispatch }, payload) {
      return dispatch('_deleteList', {
        NAMESPACE,
        request: delete_typecho_content_list,
        data: { cids: payload.map(v => v.cid) }
      }, {
        root: true
      })
    },
    deleteItem({ state, commit, dispatch }, payload) {
      return dispatch('_deleteItem', {
        NAMESPACE,
        request: delete_typecho_content_item,
        data: { ...state.info, ...payload }
      }, {
        root: true
      })
    },
    updateItem({ state, commit, dispatch }, payload = {}) {
      return dispatch('_updateItem', {
        NAMESPACE,
        request: update_typecho_content_item,
        data: { ...state.info, ...payload }
      }, {
        root: true
      })
    },
    submitItem({ state, commit, dispatch }, payload = {}) {
      return state.info.cid ? dispatch('updateItem', { ...state.info, ...payload }) : dispatch('insertItem', { ...state.info, ...payload })
    },
  }
}