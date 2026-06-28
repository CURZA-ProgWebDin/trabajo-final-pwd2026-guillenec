import { ref } from 'vue'
import { defineStore } from 'pinia'
import {
  getProductos,
  getProductoById,
  createProducto,
  updateProducto,
  deleteProducto,
} from '@/services/productosService'

export const useProductosStore = defineStore('productos', () => {
  const productos = ref([])
  const loading = ref(false)
  const error = ref('')
  const success = ref('')

  const fetchProductos = async () => {
    loading.value = true
    error.value = ''

    try {
      const response = await getProductos()
      productos.value = response.data
    } catch (err) {
      error.value = err.response?.data?.message || 'No se pudieron cargar los productos'
      throw err
    } finally {
      loading.value = false
    }
  }

  const fetchProductoById = async (id) => {
    loading.value = true
    error.value = ''

    try {
      const response = await getProductoById(id)
      return response.data
    } catch (err) {
      error.value = err.response?.data?.message || 'No se pudo cargar el producto'
      throw err
    } finally {
      loading.value = false
    }
  }

  const crearProducto = async (productoData) => {
    error.value = ''
    success.value = ''

    try {
      const response = await createProducto(productoData)
      success.value = response.data.message || 'Producto creado correctamente'
      await fetchProductos() // refrescamos la lista de productos
    } catch (err) {
      error.value = err.response?.data?.message || 'Error al crear el producto'
      throw err
    }
  }

  const actualizarProducto = async (id, productoData) => {
    error.value = ''
    success.value = ''

    try {
      const response = await updateProducto(id, productoData)
      success.value = response.data.message || 'Producto actualizado correctamente'
      await fetchProductos() // refrescamos la lista de productos
    } catch (err) {
      error.value = err.response?.data?.message || 'Error al actualizar el producto'
      throw err
    }
  }

  const eliminarProducto = async (id) => {
    error.value = ''
    success.value = ''

    try {
      const response = await deleteProducto(id)
      success.value = response.data.message || 'Producto eliminado correctamente'
      await fetchProductos() // refrescamos la lista de productos
    } catch (err) {
      error.value = err.response?.data?.message || 'Error al eliminar el producto'
      throw err
    }
  }

  return {
    productos,
    loading,
    error,
    success,
    fetchProductos,
    fetchProductoById,
    crearProducto,
    actualizarProducto,
    eliminarProducto,
  }
})
