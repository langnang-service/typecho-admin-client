import { select_typecho_meta_list, delete_typecho_meta_list, insert_typecho_meta_item, select_typecho_meta_item, update_typecho_meta_item } from '@/apis/typecho/meta'
import { state, mutations, actions } from '@/store/modules/_';
import Mock from 'mockjs'
const MOCK_KEY = 'mock'
const NAMESPACE = 'typecho/meta/';
export class TypechoMeta {
  constructor(info = {}) {
    this.mid = info === MOCK_KEY ? () => Mock.Random.id() : info.id;
    this.name = info === MOCK_KEY ? () => Mock.Random.sentence() : info.title;
    this.slug = info.slug;
    this.description = info === MOCK_KEY ? () => Mock.Random.paragraph() : info.description;
    this.count = info.order
    this.order = info.order
    this.parent = info.parent
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
    insertItem({ state, commit, dispatch }, payload) {
      dispatch('_insertItem', {
        NAMESPACE,
        request: insert_typecho_meta_item,
        data: payload
      }, {
        root: true
      })
    },
    selectList({ state, commit, dispatch }, payload) {
      return dispatch('_selectList', {
        NAMESPACE,
        request: select_typecho_meta_list,
        data: payload,
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
    deleteList({ state, commit, dispatch }, payload) {
      dispatch('_deleteList', {
        NAMESPACE,
        request: delete_typecho_meta_list,
        data: payload
      }, {
        root: true
      })
    },
    updateItem({ state, commit, dispatch }, payload) {
      dispatch('_updateItem', {
        NAMESPACE,
        request: update_typecho_meta_item,
        data: payload
      }, {
        root: true
      })
    },
    submitItem({ state, commit, dispatch }, payload) {
      payload.mid ? dispatch('updateItem', payload) : dispatch('insertItem', payload)
    },
  }
}