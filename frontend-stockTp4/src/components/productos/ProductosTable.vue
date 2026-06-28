<script setup>
import ProductoActions from './ProductoActions.vue'

defineProps({
  productos: {
    type: Array,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['edit', 'delete'])
</script>

<template>
  <div
    class="overflow-hidden rounded-3xl border border-[#28414F] bg-[#13222D]/80 shadow-2xl shadow-black/20"
  >
    <div class="overflow-x-auto">
      <table class="w-full min-w-225 text-left">
        <thead class="border-b border-[#28414F] bg-[#0D1B24]/80 text-sm text-[#86E7D3]">
          <tr>
            <th class="px-5 py-4">Producto</th>
            <th class="px-5 py-4">Categoria</th>
            <th class="px-5 py-4">Proveedor</th>
            <th class="px-5 py-4">Costo</th>
            <th class="px-5 py-4">Venta</th>
            <th class="px-5 py-4">Stock</th>
            <th v-if="isAdmin" class="px-5 py-4">Acciones</th>
          </tr>
        </thead>

        <tbody class="divide-y divide-[#28414F]/70 text-[#EAF4F6]">
          <tr
            v-for="producto in productos"
            :key="producto.id"
            :class="producto.stock_actual <= producto.stock_minimo ? 'bg-amber-300/10' : ''"
          >
            <td class="max-w-md px-5 py-4">
              <p class="font-bold">{{ producto?.nombre }}</p>
              <p class="mt-1 max-w-xl truncate text-sm text-[#9DB4BE]">
                {{ producto?.descripcion || 'Sin descripcion' }}
              </p>
            </td>

            <td class="px-5 py-4 text-[#C9D7DC]">
              {{ producto?.categoria?.nombre || '-' }}
            </td>

            <td class="px-5 py-4 text-[#C9D7DC]">
              {{ producto?.proveedor?.nombre || '-' }}
            </td>

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

            <td v-if="isAdmin" class="px-5 py-4">
              <ProductoActions
                :producto="producto"
                @edit="emit('edit', producto)"
                @delete="emit('delete', producto)"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
