import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue'),
    },
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/productos',
      name: 'productos',
      component: () => import('@/views/ProductosView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/proveedores',
      meta: { requiresAuth: true, roles: ['admin'] },
    },
    {
      path: '/movimientos/mis',
      meta: { requiresAuth: true },
    },
    {
      path: '/movimientos',
      meta: { requiresAuth: true, roles: ['admin'] },
    }
  ],
})

router.beforeEach((to) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return '/login'
  }

  if (to.name === 'login' && authStore.isAuthenticated) {
    return '/'
  }

  if (to.meta.roles && !to.meta.roles.includes(authStore.rol)) {
    return '/'
  }
})

export default router
