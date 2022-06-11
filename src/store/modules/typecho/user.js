import { select_typecho_user_list, delete_typecho_user_list, delete_typecho_user_item, insert_typecho_user_item, select_typecho_user_item, update_typecho_user_item, signup_typecho_user_item, signin_typecho_user_item } from '@/apis/typecho/user'
import { state, mutations, actions } from '@/store';
import Cookies from 'js-cookie'
import Mock from 'mockjs'
export const MOCK_KEY = 'mock'
export const NAMESPACE = 'typecho/user/'
export class TypechoUserModel {
  constructor(params = {}, mock = false) {
    this.uid = params.uid;
    this.name = params.name;
    this.password = params.password;
    this.mail = params.mail;
    this.authCode = params.authCode;
  }
  static getRules = () => ({
    name: [
      { required: true, trigger: 'blur' },
    ],
    password: [
      { required: true, trigger: 'blur' },
    ],
  })
  static getLabels = () => ({
    name: "账号",
    password: "密码",
    mail: "邮箱"
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
    signInItem({ state, commit, dispatch }, payload) {
      return dispatch('_selectItem', {
        NAMESPACE,
        request: signin_typecho_user_item,
        data: payload
      }, {
        root: true
      }).then(res => {
        Cookies.set('token', res.row.authCode);
        commit('SET_ROOT', res.row)
        return Promise.resolve(res);
      })
    },
    signUpItem({ state, commit, dispatch }, payload) {
      return dispatch('_insertItem', {
        NAMESPACE,
        request: signup_typecho_user_item,
        data: payload
      }, {
        root: true
      })
    },
    insertItem({ state, commit, dispatch }, payload) {
      return dispatch('_insertItem', {
        NAMESPACE,
        request: insert_typecho_user_item,
        data: payload
      }, {
        root: true
      })
    },
    selectList({ dispatch }, payload) {
      return dispatch('_selectList', {
        NAMESPACE,
        request: select_typecho_user_list,
        data: payload
      }, {
        root: true
      })
    },
    selectItem({ state, commit, dispatch }, payload) {
      return dispatch('_selectItem', {
        NAMESPACE,
        request: select_typecho_user_item,
        data: payload
      }, {
        root: true
      })
    },
    deleteList({ state, commit, dispatch }, payload) {
      return dispatch('_deleteList', {
        NAMESPACE,
        request: delete_typecho_user_list,
        data: { cids: payload.map(v => v.cid) }
      }, {
        root: true
      })
    },
    deleteItem({ state, commit, dispatch }, payload) {
      return dispatch('_deleteItem', {
        NAMESPACE,
        request: delete_typecho_user_item,
        data: { ...state.info, ...payload }
      }, {
        root: true
      })
    },
    updateItem({ state, commit, dispatch }, payload = {}) {
      return dispatch('_updateItem', {
        NAMESPACE,
        request: update_typecho_user_item,
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