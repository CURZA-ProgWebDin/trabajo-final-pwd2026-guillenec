import api from './api'

const getMovimientos = () => {
    return api.get('/movimientos/')
}

const createMovimientoEntrada = (movimientoData) => {
    return api.post('/movimientos/', movimientoData)
}

const createMovimientoSalida = (movimientoData) => {
    return api.post('/movimientos/', movimientoData)
}



