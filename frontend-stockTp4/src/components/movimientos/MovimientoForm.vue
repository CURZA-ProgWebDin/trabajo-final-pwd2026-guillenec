<script setup>
import { computed, reactive } from 'vue'

const props = defineProps({
  productos: {
    type: Array,
    required: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['submit'])

const form = reactive({
  tipo: 'entrada',
  cantidad: 1,
  motivo: '',
  producto_id: '',
})

const productoSeleccionado = computed(() =>
  props.productos.find((producto) => producto.id === Number(form.producto_id)),
)

const stockInsuficiente = computed(() => {
  if (form.tipo !== 'salida') {
    return false
  }

  if (!productoSeleccionado.value) {
    return false
  }

  return Number(form.cantidad) > productoSeleccionado.value.stock_actual
})

const resetForm = () => {
  form.tipo = 'entrada'
  form.cantidad = 1
  form.motivo = ''
  form.producto_id = ''
}

const handleSubmit = () => {
  if (stockInsuficiente.value) {
    return
  }

  emit('submit', {
    tipo: form.tipo,
    cantidad: Number(form.cantidad),
    motivo: form.motivo,
    producto_id: Number(form.producto_id),
  })

  resetForm()
}
</script>

<template>
  <form
    class="rounded-3xl border border-[#28414F] bg-[#13222D]/80 p-6 shadow-2xl shadow-black/20"
    @submit.prevent="handleSubmit"
  >
    <div>
      <h2 class="text-2xl font-bold text-[#EAF4F6]">Datos del movimiento</h2>

      <p class="mt-1 text-sm text-[#9DB4BE]">
        Registrá una entrada o salida de stock para un producto.
      </p>
    </div>

    <div class="mt-6 grid gap-4 md:grid-cols-2">
      <label class="space-y-2">
        <span class="text-sm font-semibold text-[#86E7D3]">Producto</span>

        <select
          v-model="form.producto_id"
          required
          class="w-full rounded-xl border border-[#28414F] bg-[#0D1B24] px-4 py-3 text-[#EAF4F6] outline-none transition focus:border-[#46D5E5] focus:ring-2 focus:ring-[#46D5E5]/30"
        >
          <option value="">Seleccionar producto</option>
          <option v-for="producto in productos" :key="producto.id" :value="producto.id">
            {{ producto.nombre }} - Stock: {{ producto.stock_actual }}
          </option>
        </select>
      </label>

      <label class="space-y-2">
        <span class="text-sm font-semibold text-[#86E7D3]">Tipo</span>

        <select
          v-model="form.tipo"
          required
          class="w-full rounded-xl border border-[#28414F] bg-[#0D1B24] px-4 py-3 text-[#EAF4F6] outline-none transition focus:border-[#46D5E5] focus:ring-2 focus:ring-[#46D5E5]/30"
        >
          <option value="entrada">Entrada</option>
          <option value="salida">Salida</option>
        </select>
      </label>

      <label class="space-y-2">
        <span class="text-sm font-semibold text-[#86E7D3]">Cantidad</span>

        <input
          v-model="form.cantidad"
          required
          type="number"
          min="1"
          step="1"
          class="w-full rounded-xl border border-[#28414F] bg-[#0D1B24] px-4 py-3 text-[#EAF4F6] outline-none transition focus:border-[#46D5E5] focus:ring-2 focus:ring-[#46D5E5]/30"
        />
      </label>

      <label class="space-y-2 md:col-span-2">
        <span class="text-sm font-semibold text-[#86E7D3]">Motivo</span>

        <textarea
          v-model="form.motivo"
          rows="3"
          placeholder="Ejemplo: compra, venta, ajuste de inventario"
          class="w-full resize-none rounded-xl border border-[#28414F] bg-[#0D1B24] px-4 py-3 text-[#EAF4F6] outline-none transition placeholder:text-[#607984] focus:border-[#46D5E5] focus:ring-2 focus:ring-[#46D5E5]/30"
        />
      </label>
    </div>

    <div
      v-if="productoSeleccionado"
      class="mt-5 rounded-2xl border border-[#28414F] bg-[#0D1B24] p-4 text-sm text-[#C9D7DC]"
    >
      <p>
        Stock actual:
        <span class="font-bold text-[#EAF4F6]">
          {{ productoSeleccionado.stock_actual }}
        </span>
      </p>

      <p class="mt-1">
        Stock mínimo:
        <span class="font-bold text-[#EAF4F6]">
          {{ productoSeleccionado.stock_minimo }}
        </span>
      </p>
    </div>

    <div
      v-if="stockInsuficiente"
      class="mt-5 rounded-xl border border-amber-300/30 bg-amber-300/10 p-4 text-amber-200"
    >
      No podés registrar una salida mayor al stock actual del producto seleccionado.
    </div>

    <div class="mt-6">
      <button
        type="submit"
        :disabled="loading || stockInsuficiente"
        class="rounded-xl bg-[#46D5E5] px-5 py-3 font-semibold text-[#08141D] transition hover:bg-[#31C3D4] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {{ loading ? 'Registrando...' : 'Registrar movimiento' }}
      </button>
    </div>
  </form>
</template>
