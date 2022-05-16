export const state = {
  loading: false,
  list: [],
  total: 0,
  page: 1,
  size: 10,
  info: {},
}
export const mutations = {
  SET_LOADING(state, payload) {
    state.loading = payload === false ? false : true;
  },
  SET_LIST(state, payload) {
    state.list = payload;
  },
  SET_INFO(state, payload) {
    state.info = payload
  }
}

export const actions = {
  _insertItem({ state, commit, dispatch }, payload) {
    payload.request(payload.data).then(res => {
      commit('SET_LIST', [payload.data, ...state.list])
      dispatch('selectList')
    }).finally(() => {
    })
  },
  _deleteList({ state, commit, dispatch }, payload) {
    this._vm.$confirm("确定要删除所选数据？", "提示", { type: 'warning' }).then(() => {
      commit('SET_LOADING', true)
      payload.request(payload.data).then(res => {
        commit('SET_LIST', state.list.filter(item => !payload.data.map(v => v.id).includes(item.id)))
        dispatch('selectList')
      }).finally(() => {
      })
    })
  },
  _updateItem() { },
  _selectList({ state, commit, dispatch }, payload) {
    commit('SET_LOADING', true)
    payload.request(payload.data).then(res => {
      commit('SET_LIST', res.rows)
    }).finally(() => {
      commit('SET_LOADING', false)
    })
  },
  _selectItem() { },

}