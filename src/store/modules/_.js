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
  },
  SET_TOTAL(state, payload) {
    state.total = payload
  },
  SET_PAGE(state, payload) {
    state.page = payload
  },
  SET_SIZE(state, payload) {
    state.size = payload
  },
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
        dispatch('selectList')
      })
    })
  },
  _updateItem({ state, commit, dispatch }, payload) {
    commit('SET_LOADING', true)
    payload.request(payload.data).then(res => {
      commit('SET_INFO', res.row)
    }).finally(() => {
      commit('SET_LOADING', false)
    })
  },
  _selectList({ state, commit, dispatch }, payload) {
    commit('SET_LOADING', true)
    payload.request({
      ...payload.data,
      page: state.page,
      size: state.size
    }).then(res => {
      commit('SET_LIST', res.rows)
      commit('SET_TOTAL', res.total)
      commit('SET_PAGE', res.page)
      commit('SET_SIZE', res.size)
    }).finally(() => {
      commit('SET_LOADING', false)
    })
  },
  _selectItem({ state, commit, dispatch }, payload) {
    commit('SET_LOADING', true)
    payload.request(payload.data).then(res => {
      commit('SET_INFO', res.row)
    }).finally(() => {
      commit('SET_LOADING', false)
    })
  },
  _submitItem({ state, commit, dispatch }, payload) {
    commit('SET_LOADING', true)
    return payload.request(payload.data).then(res => {
      commit('SET_INFO', res.row)
    }).finally(() => {
      commit('SET_LOADING', false)
    })
  },
}