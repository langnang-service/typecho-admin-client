import { select_typecho_meta_list, delete_typecho_meta_list, insert_typecho_meta_item, select_typecho_meta_item, select_typecho_meta_tree, update_typecho_meta_item, select_typecho_meta_distinct } from '@/apis/typecho/meta'
import { state, mutations, actions } from '@/store';
import Mock from 'mockjs'
export const MOCK_KEY = 'mock'
export const NAMESPACE = 'typecho/meta/';
export class TypechoMeta {
  constructor(info = {}) {
    // this.mid = info === MOCK_KEY ? Mock.Random.id() : info.id;
    this.name = info === MOCK_KEY ? Mock.Random.sentence() : info.title;
    this.slug = info === MOCK_KEY ? Mock.Random.word() : info.slug;
    this.type = info === MOCK_KEY ? Mock.Random.string() : info.type;
    this.description = info === MOCK_KEY ? Mock.Random.paragraph() : info.description;
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
        request: insert_typecho_meta_item,
        data: { ...payload, parent: rootState.typecho.branch.info?.mid || payload.parent }
      }, {
        root: true
      })
    },
    selectList({ state, commit, dispatch, rootState }, payload) {
      return dispatch('_selectList', {
        NAMESPACE,
        request: select_typecho_meta_list,
        data: { ...payload, root: rootState.typecho.branch.info?.mid || payload.parent }
      }, {
        root: true
      })
    },
    selectDistinct({ dispatch, rootState }, payload) {
      return dispatch('_selectDistinct', {
        NAMESPACE,
        request: select_typecho_meta_distinct,
        data: { ...payload, root: rootState.typecho.branch.info?.mid || payload.parent }
      }, {
        root: true
      })
    },
    selectItem({ state, commit, dispatch }, payload) {
      return dispatch('_selectItem', {
        NAMESPACE,
        request: select_typecho_meta_item,
        data: payload
      }, {
        root: true
      })
    },
    selectTree({ state, commit, dispatch }, payload) {
      return dispatch('_selectTree', {
        NAMESPACE,
        request: select_typecho_meta_tree,
        data: payload
      }, {
        root: true
      })
    },
    deleteList({ state, commit, dispatch }, payload) {
      return dispatch('_deleteList', {
        NAMESPACE,
        request: delete_typecho_meta_list,
        data: payload
      }, {
        root: true
      })
    },
    updateItem({ state, commit, dispatch }, payload) {
      return dispatch('_updateItem', {
        NAMESPACE,
        request: update_typecho_meta_item,
        data: payload
      }, {
        root: true
      })
    },
    submitItem({ state, commit, dispatch }, payload) {
      return payload.mid ? dispatch('updateItem', payload) : dispatch('insertItem', payload)
    },
  }
}