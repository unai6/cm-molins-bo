import { createRouter, createWebHistory } from 'vue-router'

import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/DashboardView.vue'),
      meta: { isPublic: false },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue'),
      meta: { isPublic: true, unauthenticatedOnly: true },
    },
    {
      path: '/create-investee',
      name: 'create-investee',
      component: () => import('@/views/investees/CreateInvesteeView.vue'),
      meta: { isPublic: false },
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  const isPublicRoute = to.meta.isPublic
  const unauthenticatedOnly = to.meta.unauthenticatedOnly

  const authStore = useAuthStore()

  if (!authStore.isReady) await authStore.init()

  const isUserLoggedIn = authStore.isLoggedIn

  if (!isPublicRoute && !isUserLoggedIn) {
    return next({
      name: 'login',
      query: { redirect: to.fullPath  }, // Store the full path to redirect the user to after login.
    })
  }

  // Do not allow user to visit login page or register page if they are logged in.
  if (isUserLoggedIn && unauthenticatedOnly) {
    return next({ name: 'home' })
  }

  next()
})

export default router
