<script setup>
import ProveedorActions from './ProveedorActions.vue'

defineProps({
  proveedores: {
    type: Array,
    required: true,
  },
})

const emit = defineEmits(['edit', 'delete'])
</script>

<template>
  <div
    class="overflow-hidden rounded-3xl border border-[#28414F] bg-[#13222D]/80 shadow-2xl shadow-black/20"
  >
    <div class="overflow-x-auto">
      <table class="w-full min-w-220 text-left">
        <thead class="border-b border-[#28414F] bg-[#0D1B24]/80 text-sm text-[#86E7D3]">
          <tr>
            <th class="px-5 py-4">Nombre</th>
            <th class="px-5 py-4">Contacto</th>
            <th class="px-5 py-4">Teléfono</th>
            <th class="px-5 py-4">Email</th>
            <th class="px-5 py-4">Acciones</th>
          </tr>
        </thead>

        <tbody class="divide-y divide-[#28414F]/70 text-[#EAF4F6]">
          <tr v-for="proveedor in proveedores" :key="proveedor.id">
            <td class="px-5 py-4">
              <p class="font-bold">{{ proveedor.nombre }}</p>
            </td>

            <td class="px-5 py-4 text-[#C9D7DC]">
              {{ proveedor.contacto || '-' }}
            </td>

            <td class="px-5 py-4 text-[#C9D7DC]">
              {{ proveedor.telefono || '-' }}
            </td>

            <td class="px-5 py-4 text-[#C9D7DC]">
              {{ proveedor.email || '-' }}
            </td>

            <td class="px-5 py-4">
              <ProveedorActions
                :proveedor="proveedor"
                @edit="emit('edit', proveedor)"
                @delete="emit('delete', proveedor)"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
