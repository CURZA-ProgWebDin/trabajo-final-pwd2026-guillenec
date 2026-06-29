<script setup>
import { computed, onMounted, ref } from 'vue'
import { useProveedoresStore } from '@/stores/proveedores'
import ProveedorForm from '@/components/proveedores/ProveedorForm.vue'
import ProveedoresTable from '@/components/proveedores/ProveedoresTable.vue'

const proveedoresStore = useProveedoresStore()

const mostrarFormulario = ref(false)
const proveedorEditando = ref(null)

const tituloFormulario = computed(() =>
  proveedorEditando.value ? 'Editar proveedor' : 'Nuevo proveedor',
)

onMounted(() => {
  proveedoresStore.fetchProveedores()
})

const abrirCrear = () => {
  proveedorEditando.value = null
  mostrarFormulario.value = true
}

const abrirEditar = (proveedor) => {
  proveedorEditando.value = proveedor
  mostrarFormulario.value = true
}

const cerrarFormulario = () => {
  mostrarFormulario.value = false
  proveedorEditando.value = null
}

const guardarProveedor = async (proveedorData) => {
  if (proveedorEditando.value) {
    await proveedoresStore.actualizarProveedor(proveedorEditando.value.id, proveedorData)
  } else {
    await proveedoresStore.crearProveedor(proveedorData)
  }

  cerrarFormulario()
}

const confirmarEliminar = async (proveedor) => {
  const confirmado = window.confirm(`¿Eliminar el proveedor "${proveedor.nombre}"?`)

  if (!confirmado) {
    return
  }

  try {
    await proveedoresStore.eliminarProveedor(proveedor.id)
  } catch {
    // El store ya guarda el mensaje en proveedoresStore.error.
  }
}
</script>

<template>
  <main class="min-h-screen bg-linear-to-br from-[#09141D] via-[#10202B] to-[#183647] px-6 py-8">
    <section class="mx-auto max-w-7xl">
      <header class="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p class="text-sm font-semibold uppercase tracking-[0.3em] text-[#86E7D3]">Admin</p>

          <h1 class="mt-2 text-4xl font-black text-[#EAF4F6]">Proveedores</h1>

          <p class="mt-2 max-w-3xl text-[#9DB4BE]">Gestión de proveedores del sistema de stock.</p>
        </div>

        <button
          type="button"
          class="rounded-xl bg-[#46D5E5] px-5 py-3 font-semibold text-[#08141D] transition hover:bg-[#31C3D4]"
          @click="abrirCrear"
        >
          Nuevo proveedor
        </button>
      </header>

      <div
        v-if="proveedoresStore.error"
        class="mb-6 rounded-xl border border-red-400/30 bg-red-400/10 p-4 text-red-200"
      >
        {{ proveedoresStore.error }}
      </div>

      <div
        v-if="proveedoresStore.success"
        class="mb-6 rounded-xl border border-emerald-400/30 bg-emerald-400/10 p-4 text-emerald-200"
      >
        {{ proveedoresStore.success }}
      </div>

      <ProveedorForm
        v-if="mostrarFormulario"
        :titulo="tituloFormulario"
        :proveedor="proveedorEditando"
        :loading="proveedoresStore.loading"
        @submit="guardarProveedor"
        @cancel="cerrarFormulario"
      />

      <div
        v-if="proveedoresStore.loading && !mostrarFormulario"
        class="rounded-3xl border border-[#28414F] bg-[#13222D]/80 p-8 text-center text-[#9DB4BE]"
      >
        Cargando proveedores...
      </div>

      <div
        v-else-if="proveedoresStore.proveedores.length === 0"
        class="rounded-3xl border border-[#28414F] bg-[#13222D]/80 p-8 text-center text-[#9DB4BE]"
      >
        No hay proveedores cargados.
      </div>

      <ProveedoresTable
        v-else
        :proveedores="proveedoresStore.proveedores"
        @edit="abrirEditar"
        @delete="confirmarEliminar"
      />
    </section>
  </main>
</template>
