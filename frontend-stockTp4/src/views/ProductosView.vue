<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useProductosStore } from '@/stores/productos'

const authStore = useAuthStore()
const productosStore = useProductosStore()

onMounted(() => {
  productosStore.fetchProductos()
})
</script>

<template>
  <main class="min-h-screen bg-linear-to-br from-[#09141D] via-[#10202B] to-[#183647] px-6 py-8">
    <section class="mx-auto max-w-7xl">
      <header class="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p class="text-sm font-semibold uppercase tracking-[0.3em] text-[#86E7D3]">Stock</p>
          <h1 class="mt-2 text-4xl font-black text-[#EAF4F6]">Productos</h1>
          <p class="mt-2 text-[#9DB4BE]">
            Listado general con categoria, proveedor y alerta de stock bajo.
          </p>
        </div>

        <button
          v-if="authStore.isAdmin"
          class="rounded-xl bg-[#46D5E5] px-5 py-3 font-semibold text-[#08141D] transition hover:bg-[#31C3D4]"
        >
          Nuevo producto
        </button>
      </header>

      <div
        v-if="productosStore.error"
        class="mb-6 rounded-xl border border-red-400/30 bg-red-400/10 p-4 text-red-200"
      >
        {{ productosStore.error }}
      </div>

      <div
        class="overflow-hidden rounded-3xl border border-[#28414F] bg-[#13222D]/80 shadow-2xl shadow-black/20"
      >
        <div v-if="productosStore.loading" class="p-8 text-center text-[#9DB4BE]">
          Cargando productos...
        </div>

        <div
          v-else-if="productosStore.productos.length === 0"
          class="p-8 text-center text-[#9DB4BE]"
        >
          No hay productos cargados.
        </div>

        <div v-else class="overflow-x-auto">
          <table class="w-full min-w-225 text-left">
            <thead class="border-b border-[#28414F] bg-[#0D1B24]/80 text-sm text-[#86E7D3]">
              <tr>
                <th class="px-5 py-4">Producto</th>
                <th class="px-5 py-4">Categoria</th>
                <th class="px-5 py-4">Proveedor</th>
                <th class="px-5 py-4">Costo</th>
                <th class="px-5 py-4">Venta</th>
                <th class="px-5 py-4">Stock</th>
                <th v-if="authStore.isAdmin" class="px-5 py-4">Acciones</th>
              </tr>
            </thead>

            <tbody class="divide-y divide-[#28414F]/70 text-[#EAF4F6]">
              <tr
                v-for="producto in productosStore.productos"
                :key="producto.id"
                :class="producto.stock_actual <= producto.stock_minimo ? 'bg-amber-300/10' : ''"
              >
                <td class="max-w-md px-5 py-4">
                  <p class="font-bold">{{ producto?.nombre }}</p>
                  <p class="mt-1 max-w-xl truncate text-sm text-[#9DB4BE]">
                    {{ producto?.descripcion || 'Sin descripcion' }}
                  </p>
                </td>
                <td class="px-5 py-4 text-[#C9D7DC]">{{ producto?.categoria?.nombre || '-' }}</td>
                <td class="px-5 py-4 text-[#C9D7DC]">{{ producto?.proveedor?.nombre || '-' }}</td>
                <td class="px-5 py-4">${{ producto?.precio_costo }}</td>
                <td class="px-5 py-4">${{ producto?.precio_venta }}</td>
                <td class="px-5 py-4">
                  <div class="space-y-1">
                    <div class="flex items-center gap-2">
                      <span class="font-bold">{{ producto?.stock_actual }}</span>

                      <span
                        v-if="producto.stock_actual <= producto.stock_minimo"
                        class="rounded-full border border-amber-300/30 bg-amber-300/15 px-2 py-0.5 text-[11px] font-bold text-amber-200"
                      >
                        Bajo
                      </span>
                    </div>

                    <p class="text-xs text-[#9DB4BE]">Mínimo: {{ producto?.stock_minimo }}</p>
                  </div>
                </td>
                <td v-if="authStore.isAdmin" class="px-5 py-4">
                  <div class="flex gap-2">
                    <button
                      class="rounded-lg border border-[#46D5E5]/40 px-3 py-2 text-sm text-[#86E7D3]"
                    >
                      Editar
                    </button>
                    <button
                      class="rounded-lg border border-red-300/40 px-3 py-2 text-sm text-red-200"
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  </main>
</template>
