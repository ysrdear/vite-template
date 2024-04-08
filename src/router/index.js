import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/index.vue";
import Login from "../views/login.vue";

const routes = [
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/error",
    name: "error",
    component: () =>
      import(/* webpackChunkName: "error" */ "../views/error.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name === "error") {
    next();
    return;
  }

  if (to.meta.requireAuth) {
    //判断是否有token
    if (localStorage.getItem("token")) {
      next();
    } else {
      localStorage.removeItem("token");
      next("/login");
    }
  } else {
    next();
  }
});

export default router;
