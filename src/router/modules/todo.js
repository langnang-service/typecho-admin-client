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
      path: ':mids(\\d+)+',
      name: "ToDoList",
      component: () => import('@/views/todo'),
    },
  ],
  beforeEnter(to, from, next) {
    $store.dispatch('typecho/branch/selectItem', {
      slug: to.path.split('/')[1]
    }).then((res) => {
      $store.commit('typecho/branch/SET_INFO', res.row)
      next()
    }).catch(() => next('/404'))
  }
}