import api from './api'

const getProductos = () => {
  return api.get('/productos/')
}

const getProductoById = (id) => {
  return api.get(`/productos/${id}`)
}

const createProducto = (productoData) => {
  return api.post('/productos/', productoData)
}

const updateProducto = (id, productoData) => {
  return api.put(`/productos/${id}`, productoData)
}

const deleteProducto = (id) => {
  return api.delete(`/productos/${id}`)
}

export { getProductos, getProductoById, createProducto, updateProducto, deleteProducto }
