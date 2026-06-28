import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { getMe, login as loginRequest } from '@/services/authService'

export const useAuthStore = defineStore(
  'auth',
  () => {
    const token = ref(null)
    const user = ref(null)

    const isAuthenticated = computed(() => !!token.value)
    const rol = computed(() => user.value?.rol?.nombre || user.value?.rol || null)
    const isAdmin = computed(() => rol.value === 'admin')

    const login = async (credenciales) => {
      const response = await loginRequest(credenciales)
      token.value = response.data.access_token

      await fetchMe()
    }

    const fetchMe = async () => {
      const response = await getMe()
      user.value = response.data
    }

    const logout = () => {
      token.value = null
      user.value = null
    }

    return {
      token,
      user,
      rol,
      isAdmin,
      isAuthenticated,
      login,
      fetchMe,
      logout,
    }
  },
  {
    persist: true,
  },
)
