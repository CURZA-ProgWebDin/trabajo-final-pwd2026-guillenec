<script setup>
import { computed, onMounted } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useProductosStore } from '@/stores/productos'

const router = useRouter()
const authStore = useAuthStore()
const productosStore = useProductosStore()

const productosStockBajo = computed(() =>
  productosStore.productos.filter((producto) => producto.stock_actual <= producto.stock_minimo),
)

onMounted(() => {
  productosStore.fetchProductos()
})

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}
</script>

<template>
  <main
    class="relative min-h-screen overflow-hidden bg-linear-to-br from-[#09141D] via-[#10202B] to-[#183647]"
  >
    <div class="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-cyan-400/15 blur-[150px]" />
    <div class="absolute right-0 bottom-0 h-112 w-md rounded-full bg-emerald-300/10 blur-[170px]" />

    <div class="relative z-10">
      <header class="border-b border-[#28414F]/70 bg-[#13222D]/70 backdrop-blur-xl">
        <div
          class="mx-auto flex max-w-7xl flex-col gap-4 px-8 py-5 md:flex-row md:items-center md:justify-between"
        >
          <div>
            <h1 class="text-3xl font-black text-[#EAF4F6]">Dashboard</h1>
            <p class="mt-1 text-[#9DB4BE]">Bienvenido {{ authStore.user?.email || 'usuario' }}</p>
            <p class="mt-1 text-xs text-amber-200">Rol: {{ authStore.rol || 'sin rol' }}</p>
          </div>

          <button
            class="rounded-xl bg-[#46D5E5] px-5 py-3 font-semibold text-[#08141D] transition hover:bg-[#31C3D4] hover:shadow-lg hover:shadow-cyan-400/30"
            @click="handleLogout"
          >
            Cerrar sesión
          </button>
        </div>
      </header>

      <section class="mx-auto max-w-7xl p-8">
        <div class="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <div class="rounded-3xl border border-[#28414F] bg-[#13222D]/70 p-6 backdrop-blur-xl">
            <p class="text-sm text-[#9DB4BE]">Productos</p>
            <h2 class="mt-3 text-4xl font-bold text-[#EAF4F6]">
              {{ productosStore.productos.length }}
            </h2>
            <p class="mt-2 text-xs text-[#9DB4BE]">Registrados en stock</p>
          </div>

          <div class="rounded-3xl border border-[#28414F] bg-[#13222D]/70 p-6 backdrop-blur-xl">
            <p class="text-sm text-[#9DB4BE]">Stock bajo</p>
            <h2 class="mt-3 text-4xl font-bold text-amber-200">{{ productosStockBajo.length }}</h2>
            <p class="mt-2 text-xs text-[#9DB4BE]">Productos en minimo o por debajo</p>
          </div>

          <div class="rounded-3xl border border-[#28414F] bg-[#13222D]/70 p-6 backdrop-blur-xl">
            <p class="text-sm text-[#9DB4BE]">Rol actual</p>
            <h2 class="mt-3 text-2xl font-bold text-[#EAF4F6]">{{ authStore.rol || '-' }}</h2>
            <p class="mt-2 text-xs text-[#9DB4BE]">Permisos aplicados por ruta</p>
          </div>

          <div class="rounded-3xl border border-[#28414F] bg-[#13222D]/70 p-6 backdrop-blur-xl">
            <p class="text-sm text-[#9DB4BE]">Sesión</p>
            <span
              class="mt-3 inline-flex rounded-full bg-emerald-400/20 px-4 py-2 text-sm font-semibold text-emerald-300"
            >
              Activa
            </span>
          </div>
        </div>

        <div
          v-if="productosStore.error"
          class="mt-6 rounded-xl border border-red-400/30 bg-red-400/10 p-4 text-red-200"
        >
          {{ productosStore.error }}
        </div>

        <div class="mt-8 grid gap-8 lg:grid-cols-2">
          <div
            class="rounded-3xl border border-[#28414F] bg-[#13222D]/70 p-8 backdrop-blur-xl lg:col-span-2"
          >
            <h2 class="text-2xl font-bold text-[#EAF4F6]">Accesos rápidos</h2>
            <p class="mt-3 text-[#9DB4BE]">
              Entrá a las secciones principales del sistema de gestión de stock.
            </p>

            <div class="mt-8 grid gap-4 md:grid-cols-2">
              <RouterLink
                to="/productos"
                class="rounded-2xl border border-[#28414F] bg-[#0D1B24] p-5 transition hover:border-[#46D5E5]/60"
              >
                <p class="font-bold text-[#EAF4F6]">Productos</p>
                <p class="mt-1 text-sm text-[#9DB4BE]">Listado visible para admin y operador.</p>
              </RouterLink>

              <RouterLink
                to="/movimientos/registrar"
                class="rounded-2xl border border-[#28414F] bg-[#0D1B24] p-5 transition hover:border-[#46D5E5]/60"
              >
                <p class="font-bold text-[#EAF4F6]">Registrar movimiento</p>
                <p class="mt-1 text-sm text-[#9DB4BE]">Base lista para entradas y salidas.</p>
              </RouterLink>

              <RouterLink
                to="/movimientos/mis"
                class="rounded-2xl border border-[#28414F] bg-[#0D1B24] p-5 transition hover:border-[#46D5E5]/60"
              >
                <p class="font-bold text-[#EAF4F6]">Mis movimientos</p>
                <p class="mt-1 text-sm text-[#9DB4BE]">Base lista para historial propio.</p>
              </RouterLink>

              <RouterLink
                v-if="authStore.isAdmin"
                to="/categorias"
                class="rounded-2xl border border-[#28414F] bg-[#0D1B24] p-5 transition hover:border-[#46D5E5]/60"
              >
                <p class="font-bold text-[#EAF4F6]">Categorias</p>
                <p class="mt-1 text-sm text-[#9DB4BE]">Base de gestión solo admin.</p>
              </RouterLink>

              <RouterLink
                v-if="authStore.isAdmin"
                to="/proveedores"
                class="rounded-2xl border border-[#28414F] bg-[#0D1B24] p-5 transition hover:border-[#46D5E5]/60"
              >
                <p class="font-bold text-[#EAF4F6]">Proveedores</p>
                <p class="mt-1 text-sm text-[#9DB4BE]">Base de gestión solo admin.</p>
              </RouterLink>

              <RouterLink
                v-if="authStore.isAdmin"
                to="/movimientos"
                class="rounded-2xl border border-[#28414F] bg-[#0D1B24] p-5 transition hover:border-[#46D5E5]/60"
              >
                <p class="font-bold text-[#EAF4F6]">Todos los movimientos</p>
                <p class="mt-1 text-sm text-[#9DB4BE]">Base de consulta solo admin.</p>
              </RouterLink>
            </div>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>
