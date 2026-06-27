import api from './api'

const getCategoria = () => {
  return api.get('/categoriass/')
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