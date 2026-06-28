import api from './api'

const login = (credenciales) => {
  return api.post('/auth/login', credenciales)
}

const register = (userData) => {
  return api.post('/auth/register', userData)
}

const getMe = () => {
  return api.get('/auth/me')
}

export { login, register, getMe }
