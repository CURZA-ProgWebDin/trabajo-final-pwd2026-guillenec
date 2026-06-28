import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getMovimientos, getMisMovimientos, createMovimiento } from '@/services/movimientosService'

export const useMovimientosStore = defineStore('movimientos', () => {
  const movimientos = ref([])
  const loading = ref(false)
  const error = ref('')
  const success = ref('')

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

  const fetchMisMovimientos = async () => {
    loading.value = true
    error.value = ''
    try {
      const response = await getMisMovimientos()
      return response.data
    } catch (err) {
      error.value = err.response?.data?.message || 'No se pudieron cargar los movimientos'
    } finally {
      loading.value = false
    }
  }

  const crearMovimiento = async (movimientoData) => {
    loading.value = true
    error.value = ''
    success.value = ''

    try {
      const response = await createMovimiento(movimientoData)
      success.value = response.data.message || 'Movimiento creado correctamente'
      await fetchMovimientos()
    } catch (err) {
      error.value = err.response?.data?.message || 'Error al crear el movimiento'
      throw err
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
