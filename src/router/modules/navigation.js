import LayoutRouterView from '@/layout/router-view'
import $store from '@/store'
import { TypechoMeta } from '@/store/modules/typecho/meta'
import { TypechoContent } from '@/store/modules/typecho/content'
const breadcrumbOptions = [
  null,
  [
    { name: "Meta", path: '/typecho/meta/list' },
    { name: "Content", path: '/typecho/content/list' },
    { name: "Comment", path: '/typecho/comment/list' },
    { name: "RelationShip", path: '/typecho/relation-ship/list' },
    { name: "User", path: '/typecho/user/list' },
  ]
]
export default {
  path: '/navigation',
  component: LayoutRouterView,
  children: [
    {
      path: '',
      name: "Navigation",
      component: () => import('@/views/navigation'),
    },
    {
      path: 'content',
      name: "Content - Typecho",
      component: LayoutRouterView,
      children: [
        {
          path: 'list',
          name: 'List - Typecho Content',
          meta: {
            breadcrumbOptions,
            footer: true,
            pagination: true,
            paginationModule: "typecho.content"
          },
          component: () => import('@/views/typecho/content/list'),
          beforeEnter: (to, from, next) => {
            $store.dispatch('typecho/content/selectList')
            $store.commit('typecho/content/SET_INFO', new TypechoContent())
            next()
          }
        },
        {
          path: 'insert',
          name: "Insert - Typecho Content",
          meta: {
            breadcrumbOptions,
            paginationModule: "typecho.content"
          },
          component: () => import('@/views/typecho/content/info.vue'),
          beforeEnter: (to, from, next) => {
            $store.commit('typecho/content/SET_INFO', new TypechoContent())
            next()
          }
        },
        {
          path: ':cid',
          name: 'Info - Typecho Content',
          meta: {
            breadcrumbOptions,
            paginationModule: "typecho.content"
          },
          component: () => import('@/views/typecho/content/info'),
          beforeEnter: (to, from, next) => {
            $store.dispatch('typecho/content/selectItem', to.params)
            next()
          }
        }
      ]
    },
    {
      path: 'meta',
      name: "Meta - Typecho",
      component: LayoutRouterView,
      children: [
        {
          path: 'list',
          name: 'List - Typecho Meta',
          meta: {
            breadcrumbOptions,
            footer: true,
            pagination: true,
            paginationModule: "typecho.meta",
          },
          component: () => import('@/views/typecho/meta/list'),
          beforeEnter: (to, from, next) => {
            $store.dispatch('typecho/meta/selectList')
            next()
          }
        },
        {
          path: 'insert',
          name: "Insert - Typecho Meta",
          meta: {
            breadcrumbOptions,
            paginationModule: "typecho.meta"
          },
          component: () => import('@/views/typecho/meta/info.vue'),
          beforeEnter: (to, from, next) => {
            $store.commit('typecho/meta/SET_INFO', new TypechoMeta())
            next()
          }
        },
        {
          path: ':mid',
          name: 'Info - Typecho Meta',
          meta: {
            breadcrumbOptions,
            paginationModule: "typecho.meta"
          },
          component: () => import('@/views/typecho/meta/info'),
          beforeEnter: (to, from, next) => {
            next()
          }
        }
      ]
    },
  ]
}