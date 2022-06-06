import { select_typecho_content_list, delete_typecho_content_list, delete_typecho_content_item, insert_typecho_content_item, select_typecho_content_item, update_typecho_content_item } from '@/apis/typecho/content'
import { state, mutations, actions } from '@/store/modules/_';
import Mock from 'mockjs'
const MOCK_KEY = 'mock'
const NAMESPACE = 'typecho/content/'
export class TypechoContent {
  constructor(info = {}) {
    this.id = info === MOCK_KEY ? () => Mock.Random.id() : info.id;
    this.title = info === MOCK_KEY ? () => Mock.Random.sentence() : info.title;
    this.description = info === MOCK_KEY ? () => Mock.Random.paragraph() : info.description;
    this.keywords = info.keywords
    this.order = info.order
    this.parent = info.parent
    this.datetime = info.datetime
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
      return dispatch('_insertItem', {
        NAMESPACE,
        request: insert_typecho_content_item,
        data: payload
      }, {
        root: true
      })
    },
    selectList({ dispatch }, payload) {
      return dispatch('_selectList', {
        NAMESPACE,
        request: select_typecho_content_list,
        data: payload
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
    submitItem({ state, commit, dispatch }) {
      return state.info.cid ? dispatch('updateItem', state.info) : dispatch('insertItem', state.info)
    },
  }
}