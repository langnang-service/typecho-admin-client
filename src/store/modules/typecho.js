import { state, mutations, actions } from '@/store/modules/_';
export default {
  namespaced: true,
  state: {
    ...state
  },
  mutations: {
    ...mutations,
  },
  modules: {
    content: require('./typecho/content')['default'],
    meta: require('./typecho/meta')['default'],
  },
  actions: {
    ...actions,
  }
}