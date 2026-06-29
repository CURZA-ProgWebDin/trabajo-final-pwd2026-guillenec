<script setup>
import { reactive, watch } from 'vue'

const props = defineProps({
  titulo: {
    type: String,
    required: true,
  },
  proveedor: {
    type: Object,
    default: null,
  },
  loading: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['submit', 'cancel'])

const form = reactive({
  nombre: '',
  contacto: '',
  telefono: '',
  email: '',
})

const resetForm = () => {
  form.nombre = ''
  form.contacto = ''
  form.telefono = ''
  form.email = ''
}

const cargarProveedor = (proveedor) => {
  form.nombre = proveedor.nombre || ''
  form.contacto = proveedor.contacto || ''
  form.telefono = proveedor.telefono || ''
  form.email = proveedor.email || ''
}

watch(
  () => props.proveedor,
  (proveedor) => {
    if (proveedor) {
      cargarProveedor(proveedor)
    } else {
      resetForm()
    }
  },
  { immediate: true },
)

const handleSubmit = () => {
  emit('submit', {
    nombre: form.nombre,
    contacto: form.contacto,
    telefono: form.telefono,
    email: form.email,
  })
}
</script>

<template>
  <form
    class="mb-8 rounded-3xl border border-[#28414F] bg-[#13222D]/80 p-6 shadow-2xl shadow-black/20"
    @submit.prevent="handleSubmit"
  >
    <div class="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
      <div>
        <h2 class="text-2xl font-bold text-[#EAF4F6]">
          {{ titulo }}
        </h2>

        <p class="mt-1 text-sm text-[#9DB4BE]">
          Completá los datos del proveedor y guardá los cambios.
        </p>
      </div>

      <button
        type="button"
        class="rounded-xl border border-[#28414F] px-4 py-2 text-sm font-semibold text-[#C9D7DC] transition hover:border-[#46D5E5]/60 hover:text-[#EAF4F6]"
        @click="emit('cancel')"
      >
        Cancelar
      </button>
    </div>

    <div class="mt-6 grid gap-4 md:grid-cols-2">
      <label class="space-y-2">
        <span class="text-sm font-semibold text-[#86E7D3]">Nombre</span>
        <input
          v-model="form.nombre"
          required
          type="text"
          placeholder="Nombre del proveedor"
          class="w-full rounded-xl border border-[#28414F] bg-[#0D1B24] px-4 py-3 text-[#EAF4F6] outline-none transition placeholder:text-[#607984] focus:border-[#46D5E5] focus:ring-2 focus:ring-[#46D5E5]/30"
        />
      </label>

      <label class="space-y-2">
        <span class="text-sm font-semibold text-[#86E7D3]">Contacto</span>
        <input
          v-model="form.contacto"
          required
          type="text"
          placeholder="Persona de contacto"
          class="w-full rounded-xl border border-[#28414F] bg-[#0D1B24] px-4 py-3 text-[#EAF4F6] outline-none transition placeholder:text-[#607984] focus:border-[#46D5E5] focus:ring-2 focus:ring-[#46D5E5]/30"
        />
      </label>

      <label class="space-y-2">
        <span class="text-sm font-semibold text-[#86E7D3]">Teléfono</span>
        <input
          v-model="form.telefono"
          required
          type="text"
          placeholder="Teléfono"
          class="w-full rounded-xl border border-[#28414F] bg-[#0D1B24] px-4 py-3 text-[#EAF4F6] outline-none transition placeholder:text-[#607984] focus:border-[#46D5E5] focus:ring-2 focus:ring-[#46D5E5]/30"
        />
      </label>

      <label class="space-y-2">
        <span class="text-sm font-semibold text-[#86E7D3]">Email</span>
        <input
          v-model="form.email"
          required
          type="email"
          placeholder="proveedor@email.com"
          class="w-full rounded-xl border border-[#28414F] bg-[#0D1B24] px-4 py-3 text-[#EAF4F6] outline-none transition placeholder:text-[#607984] focus:border-[#46D5E5] focus:ring-2 focus:ring-[#46D5E5]/30"
        />
      </label>
    </div>

    <div class="mt-6 flex flex-col gap-3 sm:flex-row">
      <button
        type="submit"
        :disabled="loading"
        class="rounded-xl bg-[#46D5E5] px-5 py-3 font-semibold text-[#08141D] transition hover:bg-[#31C3D4] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {{ loading ? 'Guardando...' : 'Guardar proveedor' }}
      </button>

      <button
        type="button"
        class="rounded-xl border border-[#28414F] px-5 py-3 font-semibold text-[#C9D7DC] transition hover:border-[#46D5E5]/60 hover:text-[#EAF4F6]"
        @click="emit('cancel')"
      >
        Cancelar
      </button>
    </div>
  </form>
</template>
