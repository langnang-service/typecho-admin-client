import { state, mutations, actions } from '@/store';
export default {
  namespaced: true,
  state: {
    ...state
  },
  mutations: {
    ...mutations,
  },
  modules: {
    branch: require('./typecho/branch')['default'],
    user: require('./typecho/user')['default'],
    content: require('./typecho/content')['default'],
    meta: require('./typecho/meta')['default'],
  },
  actions: {
    ...actions,
  }
}