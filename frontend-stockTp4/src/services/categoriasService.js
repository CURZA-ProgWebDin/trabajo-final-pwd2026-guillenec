import api from './api'

const getCategorias = () => {
  return api.get('/categorias/')
}

const getCategoriaById = (id) => {
  return api.get(`/categorias/${id}`)
}

const createCategoria = (categoriaData) => {
  return api.post('/categorias/', categoriaData)
}

const updateCategoria = (id, categoriaData) => {
  return api.put(`/categorias/${id}`, categoriaData)
}

const deleteCategoria = (id) => {
  return api.delete(`/categorias/${id}`)
}

export { getCategorias, getCategoriaById, createCategoria, updateCategoria, deleteCategoria }
