import LayoutRouterView from '@/layout/router-view'
import $store from '@/store'
import { Entry } from '@/store/modules/entry'
export default {
  path: '/entry',
  component: LayoutRouterView,
  children: [
    {
      path: '',
      name: "Entry",
      component: () => import('@/views/entry'),
    },
    {
      path: 'list',
      name: "List - Entry",
      component: () => import('@/views/entry/list.vue'),
      beforeEnter: (to, from, next) => {
        $store.dispatch('entry/selectList').then(() => {
          next()
        })
      }
    },
    {
      path: 'insert',
      name: "Insert - Entry",
      component: () => import('@/views/entry/info.vue'),
      beforeEnter: (to, from, next) => {
        $store.commit('entry/SET_INFO', new Entry()).then(() => {
          next()
        })
      }
    },
    {
      path: ':id',
      name: "Info - Entry",
      component: () => import('@/views/entry/info.vue'),
      beforeEnter: (to, from, next) => {
        $store.dispatch('entry/selectItem', to.params).then(() => {
          next()
        })
      }
    }
  ]
}