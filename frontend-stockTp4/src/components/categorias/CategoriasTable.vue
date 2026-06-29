<script setup>
import CategoriaActions from './CategoriaActions.vue'

defineProps({
  categorias: {
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
      <table class="w-full min-w-180 text-left">
        <thead class="border-b border-[#28414F] bg-[#0D1B24]/80 text-sm text-[#86E7D3]">
          <tr>
            <th class="px-5 py-4">Nombre</th>
            <th class="px-5 py-4">Descripción</th>
            <th class="px-5 py-4">Acciones</th>
          </tr>
        </thead>

        <tbody class="divide-y divide-[#28414F]/70 text-[#EAF4F6]">
          <tr v-for="categoria in categorias" :key="categoria.id">
            <td class="px-5 py-4">
              <p class="font-bold">{{ categoria.nombre }}</p>
            </td>

            <td class="max-w-xl px-5 py-4 text-[#C9D7DC]">
              <p class="truncate">
                {{ categoria.descripcion || 'Sin descripción' }}
              </p>
            </td>

            <td class="px-5 py-4">
              <CategoriaActions
                :categoria="categoria"
                @edit="emit('edit', categoria)"
                @delete="emit('delete', categoria)"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
