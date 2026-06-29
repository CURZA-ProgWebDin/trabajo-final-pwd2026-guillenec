<script setup>
import { onMounted } from 'vue'
import { useMovimientosStore } from '@/stores/movimientos'
import MovimientosTable from '@/components/movimientos/MovimientosTable.vue'

const movimientosStore = useMovimientosStore()

onMounted(() => {
  movimientosStore.fetchMisMovimientos()
})
</script>

<template>
  <main class="min-h-screen bg-linear-to-br from-[#09141D] via-[#10202B] to-[#183647] px-6 py-8">
    <section class="mx-auto max-w-7xl">
      <header class="mb-8">
        <p class="text-sm font-semibold uppercase tracking-[0.3em] text-[#86E7D3]">Stock</p>

        <h1 class="mt-2 text-4xl font-black text-[#EAF4F6]">Mis movimientos</h1>

        <p class="mt-2 max-w-3xl text-[#9DB4BE]">
          Historial de entradas y salidas registradas por tu usuario.
        </p>
      </header>

      <div
        v-if="movimientosStore.error"
        class="mb-6 rounded-xl border border-red-400/30 bg-red-400/10 p-4 text-red-200"
      >
        {{ movimientosStore.error }}
      </div>

      <div
        v-if="movimientosStore.loading"
        class="rounded-3xl border border-[#28414F] bg-[#13222D]/80 p-8 text-center text-[#9DB4BE]"
      >
        Cargando movimientos...
      </div>

      <div
        v-else-if="movimientosStore.movimientos.length === 0"
        class="rounded-3xl border border-[#28414F] bg-[#13222D]/80 p-8 text-center text-[#9DB4BE]"
      >
        Todavía no registraste movimientos.
      </div>

      <MovimientosTable v-else :movimientos="movimientosStore.movimientos" />
    </section>
  </main>
</template>
