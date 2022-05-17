import Vue from "vue";
import VueRouter from "vue-router";
import LayoutRouterView from '@/layout/router-view'
import $store from '@/store'
import { Entry } from '@/store/modules/entry'
console.log($store)
Vue.use(VueRouter);

const routes = [
  {
    path: "",
    name: "Home",
    component: () => import("../views/home"),
  },
  {
    path: '/entry',
    name: "Entry",
    component: LayoutRouterView,
    children: [
      {
        path: '',
        component: () => import('@/views/entry'),
      },
      {
        path: 'list',
        name: "List - Entry",
        component: () => import('@/views/entry/list.vue'),
        beforeEnter: (to, from, next) => {
          $store.dispatch('entry/selectList')
          next()
        }
      },
      {
        path: 'insert',
        name: "Insert - Entry",
        component: () => import('@/views/entry/info.vue'),
        beforeEnter: (to, from, next) => {
          $store.commit('entry/SET_INFO', new Entry())
          next()
        }
      },
      {
        path: ':id',
        name: "Info - Entry",
        component: () => import('@/views/entry/info.vue'),
        beforeEnter: (to, from, next) => {
          $store.dispatch('entry/selectItem', to.params)
          next()
        }
      }
    ]
  }
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name) {
    document.title = to.name
  }
  next()
})
export default router;
