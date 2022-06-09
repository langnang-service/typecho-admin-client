import LayoutRouterView from '@/layout/router-view'
import $store from '@/store'
import { TypechoMetaModel } from '@/store/modules/typecho/meta'
import { TypechoContentModel } from '@/store/modules/typecho/content'
import { TypechoBranchModel } from '@/store/modules/typecho/branch'
const breadcrumbOptions = [
  null,
  [
    { name: "Branch", path: '/typecho/branch/list' },
    { name: "Meta", path: '/typecho/meta/list' },
    { name: "Content", path: '/typecho/content/list' },
    { name: "Comment", path: '/typecho/comment/list' },
    { name: "RelationShip", path: '/typecho/relation-ship/list' },
    { name: "User", path: '/typecho/user/list' },
  ]
]
export const beforeEnter = (to, from, next) => {
  // console.log("beforeEnter", to, from);
  // console.log([...to.matched].pop().path);
  // console.log(/^\/(\w+)(?:\/(?=$))?$/i.test(to.path))
  // console.log(/^\/(\w+)(?=$)?$/i.test(to.path))
  if (/^\/(\w+)(?=$)?$/i.test(to.path)) {
    $store.dispatch('typecho/branch/selectItem', {
      type: 'branch',
      slug: to.path
    }).then(() => {
      next()
    })
  } else {
    next();
  }
}
export default {
  path: '/typecho',
  component: LayoutRouterView,
  children: [
    {
      path: '',
      name: "Typecho",
      component: () => import('@/views/typecho'),
    },
    {
      path: 'branch',
      name: "Branch - Typecho",
      component: LayoutRouterView,
      children: [
        {
          path: 'list',
          name: 'List - Typecho Branch',
          meta: {
            footer: true,
            paginationModule: "typecho.branch"
          },
          component: () => import('@/views/typecho/branch/list'),
        },
        {
          path: 'insert',
          name: "Insert - Typecho Branch",
          meta: {
            paginationModule: "typecho.content"
          },
          component: () => import('@/views/typecho/branch/info.vue'),
        },
        {
          path: ':mid',
          name: 'Info - Typecho Branch',
          meta: {
            paginationModule: "typecho.branch"
          },
          component: () => import('@/views/typecho/branch/info'),
        }
      ]
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
            paginationModule: "typecho.content"
          },
          component: () => import('@/views/typecho/content/list'),
        },
        {
          path: 'insert',
          name: "Insert - Typecho Content",
          meta: {
            breadcrumbOptions,
            paginationModule: "typecho.content"
          },
          component: () => import('@/views/typecho/content/info.vue'),
        },
        {
          path: ':cid',
          name: 'Info - Typecho Content',
          meta: {
            breadcrumbOptions,
            paginationModule: "typecho.content"
          },
          component: () => import('@/views/typecho/content/info'),
        }
      ].map(item => ({
        ...item,
        beforeEnter(to, from, next) {
          if (!$store.state.typecho.branch.info) return next("/typecho/branch/list");
          $store.dispatch('typecho/content/selectDistinct', { column: 'type' })
          $store.dispatch('typecho/content/selectDistinct', { column: 'status' })
          next();
        },
      })),
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
            paginationModule: "typecho.meta",
          },
          component: () => import('@/views/typecho/meta/list'),
        },
        {
          path: 'insert',
          name: "Insert - Typecho Meta",
          meta: {
            breadcrumbOptions,
            paginationModule: "typecho.meta"
          },
          component: () => import('@/views/typecho/meta/info'),
        },
        {
          path: ':mid',
          name: 'Info - Typecho Meta',
          meta: {
            breadcrumbOptions,
            paginationModule: "typecho.meta"
          },
          component: () => import('@/views/typecho/meta/info'),
        }
      ].map(item => ({
        ...item,
        beforeEnter(to, from, next) {
          if (!$store.state.typecho.branch.info) return next("/typecho/branch/list");
          $store.dispatch('typecho/meta/selectDistinct', { column: 'type' })
          next();
        },
      })),

    },
  ],
}