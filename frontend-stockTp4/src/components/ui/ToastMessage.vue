<script setup>
import { computed, watch } from 'vue'

const props = defineProps({
  message: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'error',
  },
  duration: {
    type: Number,
    default: 4000,
  },
})

const emit = defineEmits(['close'])

const toastClasses = computed(() => {
  if (props.type === 'success') {
    return 'border-emerald-400/30 bg-emerald-400/10 text-emerald-200'
  }

  if (props.type === 'warning') {
    return 'border-amber-300/30 bg-amber-300/10 text-amber-200'
  }

  return 'border-red-400/30 bg-red-400/10 text-red-200'
})

watch(
  () => props.message,
  (message) => {
    if (!message) {
      return
    }

    window.setTimeout(() => {
      emit('close')
    }, props.duration)
  },
)
</script>

<template>
  <Transition
    enter-active-class="transition duration-300"
    enter-from-class="opacity-0 -translate-y-2"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition duration-300"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 -translate-y-2"
  >
    <div v-if="message" class="mb-6 rounded-xl border p-4" :class="toastClasses">
      {{ message }}
    </div>
  </Transition>
</template>
