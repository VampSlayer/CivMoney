import { createRouter, createWebHistory } from "vue-router";
import { getAuth } from "firebase/auth";

// views
const Home = () => import("../views/Home.vue");
const Login = () => import("../views/Login.vue");

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: Home,
      meta: {
        auth: true,
      },
    },
    {
      path: "/login",
      component: Login,
      meta: {
        guest: true,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const auth = getAuth();
  if (to.matched.some((record) => record.meta.auth)) {
    auth.onAuthStateChanged((user) => {
      if (user) {
        next();
      } else {
        next({
          path: "/login",
        });
      }
    });
  } else if (to.matched.some((record) => record.meta.guest)) {
    auth.onAuthStateChanged((user) => {
      if (user) {
        next({
          path: "/",
        });
      } else {
        next();
      }
    });
  } else {
    next();
  }
});

export default router;
