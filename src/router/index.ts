import { createRouter, createWebHistory } from "vue-router"
import { useAuthStore } from "../composables/useAuth"

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      component: () => import("../pages/Home.vue"),
    },
    {
      path: "/auth/login",
      name: "Login",
      component: () => import("../pages/Login.vue"),
    },
    {
      path: "/auth/signup",
      name: "Signup",
      component: () => import("../pages/Signup.vue"),
    },
    {
      path: "/tickets",
      name: "Tickets",
      component: () => import("../pages/Tickets.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      component: () => import("../pages/Dashboard.vue"),
      meta: { requiresAuth: true },
    },
  ],
})

// Navigation guard for protected routes
router.beforeEach((to, _from, next) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.user.value) {
    next("/auth/login")
  } else {
    next()
  }
})

export default router
