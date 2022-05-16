import Vue from "vue";
import VueRouter from "vue-router";
import LayoutRouterView from '@/layout/router-view'
Vue.use(VueRouter);

const routes = [
  {
    path: "",
    name: "Home",
    component: () => import("../views/home"),
  },
  {
    path: '/form-list',
    name: "FormList",
    component: LayoutRouterView,
    children: [
      {
        path: '',
        component: () => import('@/views/simple-list'),
      },
      {
        path: 'admin',
        name: "Admin - FormList",
        component: () => import('@/views/simple-list/admin.vue'),
      },
      {
        path: 'admin1',
        name: "Admin1 - FormList",
        component: () => import('@/views/simple-list/admin.vue'),
      },
      {
        path: 'admin2',
        name: "Admin2 - FormList",
        component: () => import('@/views/simple-list/admin.vue'),
      }
    ]
  },
  {
    path: '/simple-list',
    name: "SimpleList",
    component: LayoutRouterView,
    children: [
      {
        path: '',
        component: () => import('@/views/simple-list'),
      },
      {
        path: 'admin',
        name: "Admin - SimpleList",
        component: () => import('@/views/simple-list/admin.vue'),
      },
      {
        path: 'admin1',
        name: "Admin1 - SimpleList",
        component: () => import('@/views/simple-list/admin.vue'),
      },
      {
        path: 'admin2',
        name: "Admin2 - SimpleList",
        component: () => import('@/views/simple-list/admin.vue'),
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
