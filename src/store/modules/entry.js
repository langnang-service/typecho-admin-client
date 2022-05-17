import { select_entry_list, delete_entry_list, insert_entry_item, select_entry_item, update_entry_item } from '@/apis/entry'
import { state, mutations, actions } from './_';
import Mock from 'mockjs'
const MOCK_KEY = 'mock'
export class Entry {
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
    selectItem({ state, commit, dispatch }, payload) {
      dispatch('_selectItem', {
        request: select_entry_item,
        data: payload
      })
    },
    deleteList({ state, commit, dispatch }, payload) {
      dispatch('_deleteList', {
        request: delete_entry_list,
        data: { ids: payload.map(v => v.id) }
      })
    },
    updateItem({ state, commit, dispatch }, payload) {
      dispatch('_updateItem', {
        request: update_entry_item,
        data: state.info
      })
    },
    submitItem({ state, commit, dispatch }) {
      return state.info.id ? dispatch('updateItem', state.info) : dispatch('insertItem', state.info)
    },
  }
}