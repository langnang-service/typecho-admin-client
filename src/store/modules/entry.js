import { select_entry_list, delete_entry_list, insert_entry_item } from '@/apis/entry'
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
        request: insert_entry_item,
        data: payload
      })
    },
    selectList({ state, commit, dispatch }, payload) {
      dispatch('_selectList', {
        request: select_entry_list,
        data: payload
      })
    },
    selectItem() { },
    deleteList({ state, commit, dispatch }, payload) {
      dispatch('_deleteList', {
        request: delete_entry_list,
        data: payload
      })
    },
  }
}