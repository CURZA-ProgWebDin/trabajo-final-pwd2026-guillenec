import api from './api'

const getProveedores = () => {
    return api.get('/proveedores/')
}

const getProveedorById = (id) => {
    return api.get(`/proveedores/${id}`)
}

const createProveedores = (proveedoresData) => {
    return api.post('/proveedores/', proveedoresData)
}

const updateProveedores = (id, proveedoresData) => {
    return api.put(`/proveedores/${id}`, proveedoresData)
}

const deleteProveedores = (id) => {
    return api.delete(`/proveedores/${id}`)
}

