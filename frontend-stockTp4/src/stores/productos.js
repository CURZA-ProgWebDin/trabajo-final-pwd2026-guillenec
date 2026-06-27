import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getProductos } from '@/services/productosService'

export const useProductosStore = defineStore('productos', () => {
  const productos = ref([])
  const loading = ref(false)
  const error = ref('')

  const fetchProductos = async () => {
    loading.value = true
    error.value = ''

    try {
      const response = await getProductos()
      productos.value = response.data
    } catch (err) {
      error.value = err.response?.data?.message || 'No se pudieron cargar los productos'
    } finally {
      loading.value = false
    }
  }

  return {
    productos,
    loading,
    error,
    fetchProductos,
  }
})
