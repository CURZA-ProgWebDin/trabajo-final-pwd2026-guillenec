import api from './api'

const getMovimientos = () => {
  return api.get('/movimientos/')
}

const getMisMovimientos = () => {
  return api.get('/movimientos/mis')
}

const createMovimiento = (movimientoData) => {
  return api.post('/movimientos/', movimientoData)
}

export { getMovimientos, getMisMovimientos, createMovimiento }
