<script setup>
defineProps({
  movimientos: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <div
    class="overflow-hidden rounded-3xl border border-[#28414F] bg-[#13222D]/80 shadow-2xl shadow-black/20"
  >
    <div class="overflow-x-auto">
      <table class="w-full min-w-180 text-left">
        <thead class="border-b border-[#28414F] bg-[#0D1B24]/80 text-sm text-[#86E7D3]">
          <tr>
            <th class="px-5 py-4">Tipo</th>
            <th class="px-5 py-4">Cantidad</th>
            <th class="px-5 py-4">Motivo</th>
            <th class="px-5 py-4">Producto ID</th>
            <th class="px-5 py-4">Usuario ID</th>
          </tr>
        </thead>

        <tbody class="divide-y divide-[#28414F]/70 text-[#EAF4F6]">
          <tr v-for="movimiento in movimientos" :key="movimiento.id">
            <td class="px-5 py-4">
              <span
                :class="
                  movimiento.tipo === 'entrada'
                    ? 'border-emerald-300/30 bg-emerald-300/10 text-emerald-200'
                    : 'border-amber-300/30 bg-amber-300/10 text-amber-200'
                "
                class="rounded-full border px-3 py-1 text-xs font-bold"
              >
                {{ movimiento.tipo }}
              </span>
            </td>

            <td class="px-5 py-4 font-bold">
              {{ movimiento.cantidad }}
            </td>

            <td class="max-w-xl px-5 py-4 text-[#C9D7DC]">
              <p class="truncate">
                {{ movimiento.motivo || 'Sin motivo' }}
              </p>
            </td>

            <td class="px-5 py-4 text-[#C9D7DC]">
              {{ movimiento.producto_id }}
            </td>

            <td class="px-5 py-4 text-[#C9D7DC]">
              {{ movimiento.user_id }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
