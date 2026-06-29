<script setup>
defineProps({
  proveedor: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['edit', 'delete'])
</script>

<template>
  <div class="flex gap-2">
    <button
      type="button"
      class="rounded-lg border border-[#46D5E5]/40 px-3 py-2 text-sm text-[#86E7D3] transition hover:border-[#46D5E5] hover:bg-[#46D5E5]/10"
      @click="emit('edit', proveedor)"
    >
      Editar
    </button>

    <button
      type="button"
      class="rounded-lg border border-red-300/40 px-3 py-2 text-sm text-red-200 transition hover:border-red-300 hover:bg-red-400/10"
      @click="emit('delete', proveedor)"
    >
      Eliminar
    </button>
  </div>
</template>
