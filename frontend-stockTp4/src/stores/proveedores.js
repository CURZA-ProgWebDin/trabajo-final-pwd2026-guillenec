import { ref } from 'vue'
import { defineStore } from 'pinia'
import {
  getProveedores,
  getProveedorById,
  createProveedor,
  updateProveedor,
  deleteProveedor,
} from '@/services/proveedoresService'

export const useProveedoresStore = defineStore('proveedores', () => {
  const proveedores = ref([])
  const loading = ref(false)
  const error = ref('')
  const success = ref('')

  const fetchProveedores = async () => {
    loading.value = true
    error.value = ''

    try {
      const response = await getProveedores()
      proveedores.value = response.data
    } catch (err) {
      error.value = err.response?.data?.message || 'No se pudieron cargar los proveedores'
    } finally {
      loading.value = false
    }
  }

  const crearProveedor = async (proveedorData) => {
    error.value = ''
    success.value = ''

    try {
      const response = await createProveedor(proveedorData)
      success.value = response.data.message || 'Proveedor creado correctamente'
      await fetchProveedores()
    } catch (err) {
      error.value = err.response?.data?.message || 'Error al crear el proveedor'
      throw error
    }
  }

  const fetchProveedorById = async (id) => {
    loading.value = true
    error.value = ''

    try {
      const response = await getProveedorById(id)
      return response.data
    } catch (err) {
      error.value = err.response?.data?.message || 'No se pudo cargar el proveedor'
      throw error
    } finally {
      loading.value = false
    }
  }

  const actualizarProveedor = async (id, proceedorData) => {
    error.value = ''
    success.value = ''

    try {
      const response = await updateProveedor(id, proceedorData)
      success.value = response.data.message || 'Proveedor actualizado correctamente'
      await fetchProveedores()
    } catch (err) {
      error.value = err.response?.data?.message || 'Error al actualizar el proveedor'
      throw error
    }
  }

  const eliminarProveedor = async (id) => {
    error.value = ''
    success.value = ''

    try {
      const response = await deleteProveedor(id)
      success.value = response.data.message || 'Proveedor eliminado correctamente'
      await fetchProveedores()
    } catch (err) {
      error.value = err.response?.data?.message || 'Error al eliminar el proveedor'
      throw error
    }
  }

  return {
    proveedores,
    loading,
    error,
    success,
    fetchProveedores,
    crearProveedor,
    fetchProveedorById,
    actualizarProveedor,
    eliminarProveedor,
  }
})
