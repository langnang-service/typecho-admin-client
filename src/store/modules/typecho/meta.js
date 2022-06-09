import { select_typecho_meta_list, delete_typecho_meta_list, insert_typecho_meta_item, select_typecho_meta_item, select_typecho_meta_tree, update_typecho_meta_item, select_typecho_meta_distinct } from '@/apis/typecho/meta'
import { state, mutations, actions } from '@/store';
import Mock from 'mockjs'
export const MOCK_KEY = 'mock'
export const NAMESPACE = 'typecho/meta/';
export class TypechoMetaModel {
  constructor(params = {}, mock = false) {
    this.mid = params.mid;
    this.name = mock === true ? Mock.Random.sentence() : params.title;
    this.slug = mock === true ? Mock.Random.word() : params.slug;
    this.type = mock === true ? Mock.Random.string() : params.type;
    this.description = mock === true ? Mock.Random.paragraph() : params.description;
    this.parent = params.parent;
  }
  static getLabels = (key) => ({
    name: "名称",
    slug: '编码',
    type: '类型',
    order: '次序',
    description: "描述"
  })
  static getRules = (key) => ({
    name: [
      { required: true, trigger: 'blur' },
    ],
    type: [
      { required: true, trigger: 'change' }
    ],
  })
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
        data: { ...payload, parent: payload.parent || rootState.typecho.branch.info?.mid }
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
    selectTree({ state, commit, dispatch, rootState }, payload) {
      return dispatch('_selectTree', {
        NAMESPACE,
        request: select_typecho_meta_tree,
        data: { ...payload, root: rootState.typecho.branch.info?.mid || payload.parent }
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