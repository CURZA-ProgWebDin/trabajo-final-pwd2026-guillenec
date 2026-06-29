<script setup>
import { computed, onMounted, ref } from 'vue'
import { useCategoriasStore } from '@/stores/categorias'
import CategoriaForm from '@/components/categorias/CategoriaForm.vue'
import CategoriasTable from '@/components/categorias/CategoriasTable.vue'

const categoriasStore = useCategoriasStore()

const mostrarFormulario = ref(false)
const categoriaEditando = ref(null)

const tituloFormulario = computed(() =>
  categoriaEditando.value ? 'Editar categoría' : 'Nueva categoría',
)

onMounted(() => {
  categoriasStore.fetchCategorias()
})

const abrirCrear = () => {
  categoriaEditando.value = null
  mostrarFormulario.value = true
}

const abrirEditar = (categoria) => {
  categoriaEditando.value = categoria
  mostrarFormulario.value = true
}

const cerrarFormulario = () => {
  mostrarFormulario.value = false
  categoriaEditando.value = null
}

const guardarCategoria = async (categoriaData) => {
  if (categoriaEditando.value) {
    await categoriasStore.actualizarCategoria(categoriaEditando.value.id, categoriaData)
  } else {
    await categoriasStore.crearCategoria(categoriaData)
  }

  cerrarFormulario()
}

const confirmarEliminar = async (categoria) => {
  const confirmado = window.confirm(`¿Eliminar la categoría "${categoria.nombre}"?`)

  if (!confirmado) {
    return
  }

  try {
    await categoriasStore.eliminarCategoria(categoria.id)
  } catch {
    // El store ya guarda el mensaje en categoriasStore.error.
  }
}
</script>

<template>
  <main class="min-h-screen bg-linear-to-br from-[#09141D] via-[#10202B] to-[#183647] px-6 py-8">
    <section class="mx-auto max-w-7xl">
      <header class="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p class="text-sm font-semibold uppercase tracking-[0.3em] text-[#86E7D3]">Admin</p>

          <h1 class="mt-2 text-4xl font-black text-[#EAF4F6]">Categorías</h1>

          <p class="mt-2 max-w-3xl text-[#9DB4BE]">Gestión de categorías del sistema de stock.</p>
        </div>

        <button
          type="button"
          class="rounded-xl bg-[#46D5E5] px-5 py-3 font-semibold text-[#08141D] transition hover:bg-[#31C3D4]"
          @click="abrirCrear"
        >
          Nueva categoría
        </button>
      </header>

      <div
        v-if="categoriasStore.error"
        class="mb-6 rounded-xl border border-red-400/30 bg-red-400/10 p-4 text-red-200"
      >
        {{ categoriasStore.error }}
      </div>

      <div
        v-if="categoriasStore.success"
        class="mb-6 rounded-xl border border-emerald-400/30 bg-emerald-400/10 p-4 text-emerald-200"
      >
        {{ categoriasStore.success }}
      </div>

      <CategoriaForm
        v-if="mostrarFormulario"
        :titulo="tituloFormulario"
        :categoria="categoriaEditando"
        :loading="categoriasStore.loading"
        @submit="guardarCategoria"
        @cancel="cerrarFormulario"
      />

      <div
        v-if="categoriasStore.loading && !mostrarFormulario"
        class="rounded-3xl border border-[#28414F] bg-[#13222D]/80 p-8 text-center text-[#9DB4BE]"
      >
        Cargando categorías...
      </div>

      <div
        v-else-if="categoriasStore.categorias.length === 0"
        class="rounded-3xl border border-[#28414F] bg-[#13222D]/80 p-8 text-center text-[#9DB4BE]"
      >
        No hay categorías cargadas.
      </div>

      <CategoriasTable
        v-else
        :categorias="categoriasStore.categorias"
        @edit="abrirEditar"
        @delete="confirmarEliminar"
      />
    </section>
  </main>
</template>
