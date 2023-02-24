import LayoutRouterView from '@/layout/router-view'
import $store from '@/store'
import { Entry } from '@/store/modules/entry'
export default {
  path: '/novel',
  component: LayoutRouterView,
  children: [
    {
      path: '',
      name: "Novel",
      component: () => import('@/views/novel'),
    },
    {
      path: 'list',
      name: "List - Novel",
      component: () => import('@/views/novel/list.vue'),
      beforeEnter: (to, from, next) => {
        $store.dispatch('entry/selectList')
        next()
      }
    },
    {
      path: 'insert',
      name: "Insert - Novel",
      component: () => import('@/views/novel/info.vue'),
      beforeEnter: (to, from, next) => {
        $store.commit('entry/SET_INFO', new Entry())
        next()
      }
    },
    {
      path: ':id',
      name: "Info - Novel",
      component: () => import('@/views/novel/info.vue'),
      beforeEnter: (to, from, next) => {
        $store.dispatch('entry/selectItem', to.params)
        next()
      }
    }
  ]
}