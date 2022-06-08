import LayoutRouterView from '@/layout/router-view'
import $store from '@/store'
import { TypechoMeta } from '@/store/modules/typecho/meta'
import { TypechoContent } from '@/store/modules/typecho/content'
import { TypechoBranch } from '@/store/modules/typecho/branch'
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
  console.log("beforeEnter", to, from);
  console.log([...to.matched].pop().path);
  console.log(/^\/(\w+)(?:\/(?=$))?$/i.test(to.path))
  console.log(/^\/(\w+)(?=$)?$/i.test(to.path))
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
            pagination: true,
            paginationModule: "typecho.branch"
          },
          component: () => import('@/views/typecho/branch/list'),
          beforeEnter: (to, from, next) => {
            $store.dispatch('typecho/branch/selectList').then(() => {
              $store.commit('typecho/branch/SET_INFO', new TypechoBranch())
              next()
            })
          }
        },
        {
          path: 'insert',
          name: "Insert - Typecho Branch",
          meta: {
            paginationModule: "typecho.content"
          },
          component: () => import('@/views/typecho/branch/info.vue'),
          beforeEnter: (to, from, next) => {
            $store.commit('typecho/branch/SET_INFO', {})
            next()
          }
        },
        {
          path: ':mid',
          name: 'Info - Typecho Branch',
          meta: {
            paginationModule: "typecho.branch"
          },
          component: () => import('@/views/typecho/branch/info'),
          beforeEnter: (to, from, next) => {
            $store.dispatch('typecho/branch/selectItem', to.params).then(() => {
              next()
            })
          }
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
            pagination: true,
            paginationModule: "typecho.content"
          },
          component: () => import('@/views/typecho/content/list'),
          beforeEnter: (to, from, next) => {
            if (!$store.state.typecho.branch.info) return next("/typecho/branch/list");
            $store.commit('typecho/content/SET_INFO', new TypechoContent())
            $store.commit('typecho/meta/SET_INFO', new TypechoMeta())
            $store.dispatch('typecho/content/selectList', { root: $store.state.typecho.branch.info?.cid })

            next()
          },
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
            if (!$store.state.typecho.branch.info) return next("/typecho/branch/list");
            $store.commit('typecho/content/SET_INFO', new TypechoContent({
              parent: to.query.parent || $store.state.typecho.branch.info?.cid
            }))
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
            if (!$store.state.typecho.branch.info) return next("/typecho/branch/list");
            Promise.all([
              $store.dispatch('typecho/content/selectItem', to.params).then(res => {
                return $store.dispatch('typecho/meta/selectList', { mids: res.mids, type: 'tag', size: 99999, page: 1 })
                  .then(res => {
                    $store.state.typecho.content.info.tags = res.rows.map(v => v.mid);
                  })
              }),
              $store.dispatch('typecho/meta/selectTree', { type: 'category' })
            ]).then(() => {
              next()
            })
          }
        }
      ],
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
            if (!$store.state.typecho.branch.info) return next("/typecho/branch/list");
            $store.dispatch('typecho/meta/selectList', { root: $store.state.typecho.branch.info?.mid })
            $store.commit('typecho/meta/SET_INFO', {})
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
          component: () => import('@/views/typecho/meta/info'),
          beforeEnter: (to, from, next) => {
            if (!$store.state.typecho.branch.info) return next("/typecho/branch/list");
            $store.commit('typecho/meta/SET_INFO', new TypechoMeta({
              parent: to.query.parent || $store.state.typecho.branch.info?.mid
            }))
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
            if (!$store.state.typecho.branch.info) return next("/typecho/branch/list");
            $store.dispatch('typecho/meta/selectItem', to.params)
            next()
          }
        }
      ]
    },
  ],
}