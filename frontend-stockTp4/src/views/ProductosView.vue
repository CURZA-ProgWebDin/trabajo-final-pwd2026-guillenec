<script setup>
import { computed, onMounted, ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useProductosStore } from '@/stores/productos'
import { useCategoriasStore } from '@/stores/categorias'
import { useProveedoresStore } from '@/stores/proveedores'
import ProductoForm from '@/components/productos/ProductoForm.vue'
import ProductosTable from '@/components/productos/ProductosTable.vue'

const authStore = useAuthStore()
const productosStore = useProductosStore()
const categoriasStore = useCategoriasStore()
const proveedoresStore = useProveedoresStore()

const mostrarFormulario = ref(false)
const productoEditando = ref(null)

const tituloFormulario = computed(() =>
  productoEditando.value ? 'Editar producto' : 'Nuevo producto',
)

onMounted(() => {
  productosStore.fetchProductos()

  if (authStore.isAdmin) {
    categoriasStore.fetchCategorias()
    proveedoresStore.fetchProveedores()
  }
})

const abrirCrear = () => {
  productoEditando.value = null
  mostrarFormulario.value = true
}

const abrirEditar = (producto) => {
  productoEditando.value = producto
  mostrarFormulario.value = true
}

const cerrarFormulario = () => {
  mostrarFormulario.value = false
  productoEditando.value = null
}

const guardarProducto = async (productoData) => {
  if (productoEditando.value) {
    await productosStore.actualizarProducto(productoEditando.value.id, productoData)
  } else {
    await productosStore.crearProducto(productoData)
  }

  cerrarFormulario()
}

const confirmarEliminar = async (producto) => {
  const confirmado = window.confirm(`¿Eliminar el producto "${producto.nombre}"?`)

  if (!confirmado) {
    return
  }

  await productosStore.eliminarProducto(producto.id)
}
</script>

<template>
  <main class="min-h-screen bg-linear-to-br from-[#09141D] via-[#10202B] to-[#183647] px-6 py-8">
    <section class="mx-auto max-w-7xl">
      <header class="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p class="text-sm font-semibold uppercase tracking-[0.3em] text-[#86E7D3]">Stock</p>

          <h1 class="mt-2 text-4xl font-black text-[#EAF4F6]">Productos</h1>

          <p class="mt-2 text-[#9DB4BE]">
            Listado general con categoría, proveedor y alerta de stock bajo.
          </p>
        </div>

        <button
          v-if="authStore.isAdmin"
          type="button"
          class="rounded-xl bg-[#46D5E5] px-5 py-3 font-semibold text-[#08141D] transition hover:bg-[#31C3D4]"
          @click="abrirCrear"
        >
          Nuevo producto
        </button>
      </header>

      <div
        v-if="productosStore.error"
        class="mb-6 rounded-xl border border-red-400/30 bg-red-400/10 p-4 text-red-200"
      >
        {{ productosStore.error }}
      </div>

      <div
        v-if="productosStore.success"
        class="mb-6 rounded-xl border border-emerald-400/30 bg-emerald-400/10 p-4 text-emerald-200"
      >
        {{ productosStore.success }}
      </div>

      <ProductoForm
        v-if="authStore.isAdmin && mostrarFormulario"
        :titulo="tituloFormulario"
        :producto="productoEditando"
        :categorias="categoriasStore.categorias"
        :proveedores="proveedoresStore.proveedores"
        :loading="productosStore.loading"
        @submit="guardarProducto"
        @cancel="cerrarFormulario"
      />

      <div
        v-if="productosStore.loading && !mostrarFormulario"
        class="rounded-3xl border border-[#28414F] bg-[#13222D]/80 p-8 text-center text-[#9DB4BE]"
      >
        Cargando productos...
      </div>

      <div
        v-else-if="productosStore.productos.length === 0"
        class="rounded-3xl border border-[#28414F] bg-[#13222D]/80 p-8 text-center text-[#9DB4BE]"
      >
        No hay productos cargados.
      </div>

      <ProductosTable
        v-else
        :productos="productosStore.productos"
        :is-admin="authStore.isAdmin"
        @edit="abrirEditar"
        @delete="confirmarEliminar"
      />
    </section>
  </main>
</template>
