<script setup>
defineProps({
  categoria: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['delete-categoria', 'edit-categoria'])
</script>

<template>
  <div>
    <h1>Categoria Actions</h1>
  </div>
</template>
