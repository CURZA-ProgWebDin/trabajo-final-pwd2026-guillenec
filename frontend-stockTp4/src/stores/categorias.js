import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getCategorias } from '@/services/categoriasService'

export const useCategoriasStore = defineStore('categorias', () => {
  const categorias = ref([])
  const loading = ref(false)
  const error = ref('')

  const fetchCategorias = async () => {
    loading.value = true
    error.value = ''

    try {
      const response = await getCategorias()
      categorias.value = response.data
    } catch (err) {
      error.value = err.response?.data?.message || 'No se pudieron cargar las categorias'
    } finally {
      loading.value = false
    }
  }

  return {
    categorias,
    loading,
    error,
    fetchCategorias,
  }
})