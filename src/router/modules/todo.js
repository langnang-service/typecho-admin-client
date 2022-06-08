import LayoutRouterView from '@/layout/router-view'
import $store from '@/store'
import { TypechoMetaModel } from '@/store/modules/typecho/meta'
import { TypechoContentModel } from '@/store/modules/typecho/content'
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
  path: '/todo',
  component: LayoutRouterView,
  children: [
    {
      path: '',
      name: "ToDoList",
      component: () => import('@/views/todo'),
    },
    {
      path: 'content',
      name: "Content - ToDo",
      component: LayoutRouterView,
      children: [
        {
          path: 'list',
          name: 'List - ToDo Content',
          meta: {
            breadcrumbOptions,
            footer: true,
            pagination: true,
            paginationModule: "typecho.content"
          },
          component: () => import('@/views/typecho/content/list'),
          beforeEnter: (to, from, next) => {
            $store.dispatch('typecho/content/selectList')
            $store.commit('typecho/content/SET_INFO', new TypechoContentModel())
            next()
          }
        },
        {
          path: 'insert',
          name: "Insert - ToDo Content",
          meta: {
            breadcrumbOptions,
            paginationModule: "typecho.content"
          },
          component: () => import('@/views/typecho/content/info.vue'),
          beforeEnter: (to, from, next) => {
            $store.commit('typecho/content/SET_INFO', new TypechoContentModel())
            next()
          }
        },
        {
          path: ':cid',
          name: 'Info - ToDo Content',
          meta: {
            breadcrumbOptions,
            paginationModule: "typecho.content"
          },
          component: () => import('@/views/typecho/content/info'),
          beforeEnter: (to, from, next) => {
            $store.dispatch('typecho/content/selectItem', to.params).then(() => {
              next()
            })
          }
        }
      ]
    },
    {
      path: 'meta',
      name: "Meta - ToDo",
      component: LayoutRouterView,
      children: [
        {
          path: 'list',
          name: 'List - ToDo Meta',
          meta: {
            breadcrumbOptions,
            footer: true,
            pagination: true,
            paginationModule: "typecho.meta",
          },
          component: () => import('@/views/typecho/meta/list'),
          beforeEnter: (to, from, next) => {
            $store.dispatch('typecho/meta/selectList').then(() => {
              next()
            })
          }
        },
        {
          path: 'insert',
          name: "Insert - ToDo Meta",
          meta: {
            breadcrumbOptions,
            paginationModule: "typecho.meta"
          },
          component: () => import('@/views/typecho/meta/info.vue'),
          beforeEnter: (to, from, next) => {
            $store.commit('typecho/meta/SET_INFO', new TypechoMetaModel()).then(() => {
              next()
            })
          }
        },
        {
          path: ':mid',
          name: 'Info - ToDo Meta',
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