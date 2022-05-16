import { select_simple_list_list, delete_simple_list_list, insert_simple_list_item } from '@/apis/simple-list'
import { state, mutations, actions } from './_';
export default {
  namespaced: true,
  state: {
    ...state
  },
  mutations: {
    ...mutations,
  },
  actions: {
    ...actions,
    insertItem({ state, commit, dispatch }, payload) {
      dispatch('_insertItem', {
        request: insert_simple_list_item,
        data: payload
      })
    },
    selectList({ state, commit, dispatch }, payload) {
      dispatch('_selectList', {
        request: select_simple_list_list,
        data: payload
      })
    },
    selectItem() { },
    deleteList({ state, commit, dispatch }, payload) {
      dispatch('_deleteList', {
        request: delete_simple_list_list,
        data: payload
      })
    },
  }
}