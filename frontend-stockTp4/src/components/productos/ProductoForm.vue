<script setup>
import { reactive, watch } from 'vue'

const props = defineProps({
  titulo: {
    type: String,
    required: true,
  },
  producto: {
    type: Object,
    default: null,
  },
  categorias: {
    type: Array,
    required: true,
  },
  proveedores: {
    type: Array,
    required: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['submit', 'cancel'])

const form = reactive({
  nombre: '',
  descripcion: '',
  precio_costo: '',
  precio_venta: '',
  stock_actual: 0,
  stock_minimo: 0,
  categoria_id: '',
  proveedor_id: '',
})

const resetForm = () => {
  form.nombre = ''
  form.descripcion = ''
  form.precio_costo = ''
  form.precio_venta = ''
  form.stock_actual = 0
  form.stock_minimo = 0
  form.categoria_id = ''
  form.proveedor_id = ''
}

const cargarProducto = (producto) => {
  form.nombre = producto.nombre || ''
  form.descripcion = producto.descripcion || ''
  form.precio_costo = producto.precio_costo || ''
  form.precio_venta = producto.precio_venta || ''
  form.stock_actual = producto.stock_actual ?? 0
  form.stock_minimo = producto.stock_minimo ?? 0
  form.categoria_id = producto.categoria?.id || ''
  form.proveedor_id = producto.proveedor?.id || ''
}

watch(
  () => props.producto,
  (producto) => {
    if (producto) {
      cargarProducto(producto)
    } else {
      resetForm()
    }
  },
  { immediate: true },
)

const handleSubmit = () => {
  const productoData = {
    nombre: form.nombre,
    descripcion: form.descripcion,
    precio_costo: Number(form.precio_costo),
    precio_venta: Number(form.precio_venta),
    stock_actual: Number(form.stock_actual),
    stock_minimo: Number(form.stock_minimo),
    categoria_id: Number(form.categoria_id),
    proveedor_id: form.proveedor_id ? Number(form.proveedor_id) : null,
  }

  emit('submit', productoData)
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
          Completá los datos del producto y guardá los cambios.
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
          placeholder="Nombre del producto"
          class="w-full rounded-xl border border-[#28414F] bg-[#0D1B24] px-4 py-3 text-[#EAF4F6] outline-none transition placeholder:text-[#607984] focus:border-[#46D5E5] focus:ring-2 focus:ring-[#46D5E5]/30"
        />
      </label>

      <label class="space-y-2">
        <span class="text-sm font-semibold text-[#86E7D3]">Categoría</span>
        <select
          v-model="form.categoria_id"
          required
          class="w-full rounded-xl border border-[#28414F] bg-[#0D1B24] px-4 py-3 text-[#EAF4F6] outline-none transition focus:border-[#46D5E5] focus:ring-2 focus:ring-[#46D5E5]/30"
        >
          <option value="">Seleccionar categoría</option>
          <option v-for="categoria in categorias" :key="categoria.id" :value="categoria.id">
            {{ categoria.nombre }}
          </option>
        </select>
      </label>

      <label class="space-y-2">
        <span class="text-sm font-semibold text-[#86E7D3]">Proveedor</span>
        <select
          v-model="form.proveedor_id"
          class="w-full rounded-xl border border-[#28414F] bg-[#0D1B24] px-4 py-3 text-[#EAF4F6] outline-none transition focus:border-[#46D5E5] focus:ring-2 focus:ring-[#46D5E5]/30"
        >
          <option value="">Sin proveedor</option>
          <option v-for="proveedor in proveedores" :key="proveedor.id" :value="proveedor.id">
            {{ proveedor.nombre }}
          </option>
        </select>
      </label>

      <label class="space-y-2">
        <span class="text-sm font-semibold text-[#86E7D3]">Precio costo</span>
        <input
          v-model="form.precio_costo"
          required
          type="number"
          min="0"
          step="0.01"
          placeholder="0.00"
          class="w-full rounded-xl border border-[#28414F] bg-[#0D1B24] px-4 py-3 text-[#EAF4F6] outline-none transition placeholder:text-[#607984] focus:border-[#46D5E5] focus:ring-2 focus:ring-[#46D5E5]/30"
        />
      </label>

      <label class="space-y-2">
        <span class="text-sm font-semibold text-[#86E7D3]">Precio venta</span>
        <input
          v-model="form.precio_venta"
          required
          type="number"
          min="0"
          step="0.01"
          placeholder="0.00"
          class="w-full rounded-xl border border-[#28414F] bg-[#0D1B24] px-4 py-3 text-[#EAF4F6] outline-none transition placeholder:text-[#607984] focus:border-[#46D5E5] focus:ring-2 focus:ring-[#46D5E5]/30"
        />
      </label>

      <label class="space-y-2">
        <span class="text-sm font-semibold text-[#86E7D3]">Stock actual</span>
        <input
          v-model="form.stock_actual"
          required
          type="number"
          min="0"
          step="1"
          class="w-full rounded-xl border border-[#28414F] bg-[#0D1B24] px-4 py-3 text-[#EAF4F6] outline-none transition focus:border-[#46D5E5] focus:ring-2 focus:ring-[#46D5E5]/30"
        />
      </label>

      <label class="space-y-2">
        <span class="text-sm font-semibold text-[#86E7D3]">Stock mínimo</span>
        <input
          v-model="form.stock_minimo"
          required
          type="number"
          min="0"
          step="1"
          class="w-full rounded-xl border border-[#28414F] bg-[#0D1B24] px-4 py-3 text-[#EAF4F6] outline-none transition focus:border-[#46D5E5] focus:ring-2 focus:ring-[#46D5E5]/30"
        />
      </label>

      <label class="space-y-2 md:col-span-2">
        <span class="text-sm font-semibold text-[#86E7D3]">Descripción</span>
        <textarea
          v-model="form.descripcion"
          rows="3"
          placeholder="Descripción breve del producto"
          class="w-full resize-none rounded-xl border border-[#28414F] bg-[#0D1B24] px-4 py-3 text-[#EAF4F6] outline-none transition placeholder:text-[#607984] focus:border-[#46D5E5] focus:ring-2 focus:ring-[#46D5E5]/30"
        />
      </label>
    </div>

    <div class="mt-6 flex flex-col gap-3 sm:flex-row">
      <button
        type="submit"
        :disabled="loading"
        class="rounded-xl bg-[#46D5E5] px-5 py-3 font-semibold text-[#08141D] transition hover:bg-[#31C3D4] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {{ loading ? 'Guardando...' : 'Guardar producto' }}
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
