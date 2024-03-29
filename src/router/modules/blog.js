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
  path: '/blog',
  component: LayoutRouterView,
  children: [
    {
      path: '',
      name: "Blog",
      meta: {
        header: false,
        footer: true,
        pagination: true,
        paginationModule: "typecho.content"
      },
      component: () => import('@/views/blog'),
      beforeEnter(to, from, next) {

        next();
      }
    },
    {
      path: 'content',
      name: "Content - Blog",
      component: LayoutRouterView,
      children: [
        {
          path: 'list',
          name: 'List - Blog Content',
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
          name: "Insert - Blog Content",
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
          name: 'Info - Blog Content',
          meta: {
            breadcrumbOptions,
            paginationModule: "typecho.content"
          },
          component: () => import('@/views/blog/info'),
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
      name: "Meta - Blog",
      component: LayoutRouterView,
      children: [
        {
          path: 'list',
          name: 'List - Blog Meta',
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
          name: "Insert - Blog Meta",
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
          name: 'Info - Blog Meta',
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
  ],
  beforeEnter(to, from, next) {
    $store.dispatch('typecho/branch/selectItem', {
      slug: to.path.split('/')[1]
    }).then(res => {
      $store.commit('typecho/branch/SET_INFO', res.row)
      next()
    }).catch(() => next('/404'))
  }
}