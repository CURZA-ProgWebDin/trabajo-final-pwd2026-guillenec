import { ref } from 'vue'
import { defineStore } from 'pinia'
import {
  getCategorias,
  getCategoriaById,
  createCategoria,
  updateCategoria,
  deleteCategoria,
} from '@/services/categoriasService'

export const useCategoriasStore = defineStore('categorias', () => {
  const categorias = ref([])
  const loading = ref(false)
  const error = ref('')
  const success = ref('')

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

  const fetchCategoriaById = async (id) => {
    loading.value = true
    error.value = ''

    try {
      const response = await getCategoriaById(id)
      return response.data
    } catch (err) {
      error.value = err.response?.data?.message || 'No se pudo cargar la categoria'
      throw error
    } finally {
      loading.value = false
    }
  }

  const crearCategoria = async (categoriaData) => {
    error.value = ''
    success.value = ''

    try {
      const response = await createCategoria(categoriaData)
      success.value = response.data.message || 'Categoria creada correctamente'
      await fetchCategorias() // refrescamos la lista de categorias
    } catch (err) {
      error.value = err.response?.data?.message || 'Error al crear la categoria'
      throw error
    }
  }

  const actualizarCategoria = async (id, categoriaData) => {
    error.value = ''
    success.value = ''

    try {
      const response = await updateCategoria(id, categoriaData)
      success.value = response.data.message || 'Categoria actualizada correctamente'
      await fetchCategorias() // refrescamos la lista de categorias
    } catch (err) {
      error.value = err.response?.data?.message || 'Error al actualizar la categoria'
      throw error
    }
  }

  const eliminarCategoria = async (id) => {
    error.value = ''
    success.value = ''

    try {
      const response = await deleteCategoria(id)
      success.value = response.data.message || 'Categoria eliminada correctamente'
      await fetchCategorias() // refrescamos la lista de categorias
    } catch (err) {
      error.value = err.response?.data?.message || 'Error al eliminar la categoria'
      throw error
    }
  }

  return {
    categorias,
    loading,
    error,
    success,
    fetchCategorias,
    fetchCategoriaById,
    crearCategoria,
    actualizarCategoria,
    eliminarCategoria,
  }
})
