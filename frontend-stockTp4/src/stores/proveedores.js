import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getProveedores } from '@/services/proveedoresService'

export const useProveedoresStore = defineStore('proveedores', () => {
  const proveedores = ref([])
  const loading = ref(false)
  const error = ref('')

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

  return {
    proveedores,
    loading,
    error,
    fetchProveedores,
  }
})