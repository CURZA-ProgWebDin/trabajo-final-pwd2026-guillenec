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
      path: '/categorias',
      name: 'categorias',
      component: () => import('@/views/CategoriasView.vue'),
      meta: { requiresAuth: true, roles: ['admin'] },
    },
    {
      path: '/proveedores',
      name: 'proveedores',
      component: () => import('@/views/ProveedoresView.vue'),
      meta: { requiresAuth: true, roles: ['admin'] },
    },
    {
      path: '/movimientos/registrar',
      name: 'registrar-movimiento',
      component: () => import('@/views/MovimientoFormView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/movimientos/mis',
      name: 'mis-movimientos',
      component: () => import('@/views/MisMovimientosView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/movimientos',
      name: 'movimientos',
      component: () => import('@/views/MovimientosView.vue'),
      meta: { requiresAuth: true, roles: ['admin'] },
    },
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
