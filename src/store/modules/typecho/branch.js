import { select_typecho_branch_list, delete_typecho_branch_list, delete_typecho_branch_item, insert_typecho_branch_item, select_typecho_branch_item, update_typecho_branch_item } from '@/apis/typecho/branch'
import { state, mutations, actions } from '@/store';
import Mock from 'mockjs'
export const MOCK_KEY = 'mock'
export const NAMESPACE = 'typecho/branch/'
export class TypechoBranchModel {
  constructor(params = {}, mock = false) {
    this.cid = params.cid;
    this.mid = params.mid;
    this.name = mock ? Mock.Random.cword(2, 4) : params.title;
    this.slug = mock ? Mock.Random.word() : params.slug;
    this.description = mock ? Mock.Random.paragraph() : params.description;
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
        request: insert_typecho_branch_item,
        data: payload
      }, {
        root: true
      })
    },
    selectList({ dispatch }, payload) {
      return dispatch('_selectList', {
        NAMESPACE,
        request: select_typecho_branch_list,
        data: payload
      }, {
        root: true
      })
    },
    selectItem({ state, commit, dispatch }, payload) {
      return dispatch('_selectItem', {
        NAMESPACE,
        request: select_typecho_branch_item,
        data: payload
      }, {
        root: true
      })
    },
    deleteList({ state, commit, dispatch }, payload) {
      return dispatch('_deleteList', {
        NAMESPACE,
        request: delete_typecho_branch_list,
        data: { cids: payload.map(v => v.cid) }
      }, {
        root: true
      })
    },
    deleteItem({ state, commit, dispatch }, payload) {
      return dispatch('_deleteItem', {
        NAMESPACE,
        request: delete_typecho_branch_item,
        data: { ...state.info, ...payload }
      }, {
        root: true
      })
    },
    updateItem({ state, commit, dispatch }, payload = {}) {
      return dispatch('_updateItem', {
        NAMESPACE,
        request: update_typecho_branch_item,
        data: { ...state.info, ...payload }
      }, {
        root: true
      })
    },
    submitItem({ state, commit, dispatch }, payload = {}) {
      return payload.cid ? dispatch('updateItem', { ...state.info, ...payload }) : dispatch('insertItem', { ...state.info, ...payload })
    },
  }
}