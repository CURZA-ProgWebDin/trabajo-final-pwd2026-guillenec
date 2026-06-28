import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getMovimientos } from '@/services/movimientosService'

export const useMovimientosStore = defineStore('movimientos', () => {
  const movimientos = ref([])
  const loading = ref(false)
  const error = ref('')

  const fetchMovimientos = async () => {
    loading.value = true
    error.value = ''

    try {
      const response = await getMovimientos()
      movimientos.value = response.data
    } catch (err) {
      error.value = err.response?.data?.message || 'No se pudieron cargar los movimientos'
    } finally {
      loading.value = false
    }
  }

  return {
    movimientos,
    loading,
    error,
    fetchMovimientos,
  }
})
