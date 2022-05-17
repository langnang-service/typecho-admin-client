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
    path: '/entry',
    name: "Entry",
    component: LayoutRouterView,
    children: [
      {
        path: '',
        component: () => import('@/views/entry'),
      },
      {
        path: 'admin',
        name: "Admin - Entry",
        component: () => import('@/views/entry/admin.vue'),
      },
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
