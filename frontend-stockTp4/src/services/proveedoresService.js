import api from './api'

const getProveedores = () => {
  return api.get('/proveedores/')
}

const getProveedorById = (id) => {
  return api.get(`/proveedores/${id}`)
}

const createProveedor = (proveedoresData) => {
  return api.post('/proveedores/', proveedoresData)
}

const updateProveedor = (id, proveedoresData) => {
  return api.put(`/proveedores/${id}`, proveedoresData)
}

const deleteProveedor = (id) => {
  return api.delete(`/proveedores/${id}`)
}

export { getProveedores, getProveedorById, createProveedor, updateProveedor, deleteProveedor }
