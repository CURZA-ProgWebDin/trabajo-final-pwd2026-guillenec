<script setup>
import { onMounted } from 'vue'
import { useProductosStore } from '@/stores/productos'
import { useMovimientosStore } from '@/stores/movimientos'
import MovimientoForm from '@/components/movimientos/MovimientoForm.vue'

const productosStore = useProductosStore()
const movimientosStore = useMovimientosStore()

onMounted(() => {
  productosStore.fetchProductos()
})

const registrarMovimiento = async (movimientoData) => {
  try {
    await movimientosStore.crearMovimiento(movimientoData)

    await productosStore.fetchProductos()
  } catch {
    // El store ya guarda el mensaje en movimientosStore.error.
  }
}
</script>

<template>
  <main class="min-h-screen bg-linear-to-br from-[#09141D] via-[#10202B] to-[#183647] px-6 py-8">
    <section class="mx-auto max-w-7xl">
      <header class="mb-8">
        <p class="text-sm font-semibold uppercase tracking-[0.3em] text-[#86E7D3]">Stock</p>

        <h1 class="mt-2 text-4xl font-black text-[#EAF4F6]">Registrar movimiento</h1>

        <p class="mt-2 max-w-3xl text-[#9DB4BE]">
          Registrá entradas y salidas de stock. El sistema valida el stock disponible antes de
          enviar una salida.
        </p>
      </header>

      <div
        v-if="movimientosStore.error"
        class="mb-6 rounded-xl border border-red-400/30 bg-red-400/10 p-4 text-red-200"
      >
        {{ movimientosStore.error }}
      </div>

      <div
        v-if="movimientosStore.success"
        class="mb-6 rounded-xl border border-emerald-400/30 bg-emerald-400/10 p-4 text-emerald-200"
      >
        {{ movimientosStore.success }}
      </div>

      <div
        v-if="productosStore.error"
        class="mb-6 rounded-xl border border-red-400/30 bg-red-400/10 p-4 text-red-200"
      >
        {{ productosStore.error }}
      </div>

      <div
        v-if="productosStore.loading"
        class="rounded-3xl border border-[#28414F] bg-[#13222D]/80 p-8 text-center text-[#9DB4BE]"
      >
        Cargando productos...
      </div>

      <MovimientoForm
        v-else
        :productos="productosStore.productos"
        :loading="movimientosStore.loading"
        @submit="registrarMovimiento"
      />
    </section>
  </main>
</template>
