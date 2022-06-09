import { select_typecho_content_list, delete_typecho_content_list, delete_typecho_content_item, insert_typecho_content_item, select_typecho_content_item, update_typecho_content_item, select_typecho_content_distinct } from '@/apis/typecho/content'
import { state, mutations, actions } from '@/store';
import Mock from 'mockjs'
export const MOCK_KEY = 'mock'
export const NAMESPACE = 'typecho/content/'
export class TypechoContentModel {
  constructor(params = {}, mock = false) {
    this.id = params.id;
    this.title = mock === true ? Mock.Random.sentence() : params.title;
    this.slug = mock === true ? Mock.Random.string() : params.slug;
    this.type = mock === true ? Mock.Random.word() : params.type;
    this.text_content = mock === true ? Mock.Random.paragraph() : params.description;
    this.mids = params.mids || "";
    this.tags = params.tags || [];
    this.parent = params.parent;
  }

  static getRules = () => ({
    name: [
      { required: true, trigger: 'blur' },
    ],
    type: [
      { required: true, trigger: 'change' }
    ],
  })
  static getLabels = () => ({})
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
        data: { ...payload, parent: payload.parent || rootState.typecho.branch.info?.mid }
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
      return payload.cid ? dispatch('updateItem', payload) : dispatch('insertItem', payload)
    },
  }
}