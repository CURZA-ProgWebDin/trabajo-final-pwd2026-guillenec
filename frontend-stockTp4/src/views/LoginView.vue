<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

const handleSubmit = async () => {
  error.value = ''
  loading.value = true

  try {
    await authStore.login({
      email: email.value,
      password: password.value,
    })

    router.push('/')
  } catch (err) {
    error.value = err.response?.data?.message || 'No se pudo iniciar sesión'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <main
    class="relative overflow-hidden min-h-screen flex items-center justify-center bg-linear-to-br from-[#09141D] via-[#10202B] to-[#183647] px-6"
  >
    <form
      @submit.prevent="handleSubmit"
      class="w-full max-w-md rounded-3xl bg-[#13222D]/90 backdrop-blur-xl border border-[#28414F] shadow-2xl p-10"
    >
      <div class="mb-8 text-center">
        <h1 class="text-4xl font-black text-[#EAF4F6]">Bienvenido</h1>

        <p class="mt-2 text-[#9DB4BE]">Iniciá sesión para continuar</p>
      </div>

      <div class="space-y-5">
        <div>
          <label class="block text-sm mb-2 text-[#86E7D3]"> Correo electrónico </label>

          <input
            v-model="email"
            type="email"
            placeholder="usuario@email.com"
            class="w-full rounded-xl bg-[#0D1B24] border border-[#28414F] px-4 py-3 text-[#EAF4F6] placeholder:text-[#607984] outline-none transition focus:border-[#46D5E5] focus:ring-2 focus:ring-[#46D5E5]/30"
          />
        </div>

        <div>
          <label class="block text-sm mb-2 text-[#86E7D3]"> Contraseña </label>

          <input
            v-model="password"
            type="password"
            placeholder="••••••••"
            class="w-full rounded-xl bg-[#0D1B24] border border-[#28414F] px-4 py-3 text-[#EAF4F6] placeholder:text-[#607984] outline-none transition focus:border-[#46D5E5] focus:ring-2 focus:ring-[#46D5E5]/30"
          />
        </div>

        <Transition
          enter-active-class="transition duration-300"
          enter-from-class="opacity-0 -translate-y-2"
          enter-to-class="opacity-100 translate-y-0"
        >
          <p
            v-if="error"
            class="rounded-lg bg-[#FF6B81]/15 border border-[#FF6B81]/30 p-3 text-sm text-[#FF6B81]"
          >
            {{ error }}
          </p>
        </Transition>

        <button
          type="submit"
          :disabled="loading"
          class="w-full rounded-xl bg-[#46D5E5] py-3 font-bold text-[#08141D] transition-all duration-300 hover:bg-[#31C3D4] hover:shadow-lg hover:shadow-cyan-400/30 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ loading ? 'Ingresando...' : 'Ingresar' }}
        </button>
      </div>
    </form>
  </main>
  <div class="absolute top-0 left-0 h-96 w-96 rounded-full bg-cyan-400/15 blur-[140px]"></div>

  <div
    class="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-emerald-300/10 blur-[160px]"
  ></div>
</template>
