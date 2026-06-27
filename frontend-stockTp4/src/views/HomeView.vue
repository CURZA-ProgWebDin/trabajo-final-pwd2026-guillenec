<script setup>
    import { useRouter } from 'vue-router'
    import { useAuthStore } from '@/stores/auth'

    const router = useRouter()
    const authStore = useAuthStore()

    const handleLogout = () => {
    authStore.logout()
    router.push('/login')
    }
    
</script>

<template>
  <main
    class="relative min-h-screen overflow-hidden
           bg-linear-to-br from-[#09141D] via-[#10202B] to-[#183647]"
  >
    <!-- Aurora -->
    <div
      class="absolute -top-40 -left-40 h-96 w-96 rounded-full
             bg-cyan-400/15 blur-[150px]"
    />

    <div
      class="absolute bottom-0 right-0 h-112 w-md rounded-full
             bg-emerald-300/10 blur-[170px]"
    />

    <!-- Contenido -->
    <div class="relative z-10">

      <!-- Header -->
      <header
        class="border-b border-[#28414F]/70
               bg-[#13222D]/70
               backdrop-blur-xl"
      >
        <div
          class="mx-auto flex max-w-7xl items-center justify-between
                 px-8 py-5"
        >
          <div>
            <h1 class="text-3xl font-black text-[#EAF4F6]">
              Dashboard
            </h1>

            <p class="mt-1 text-[#9DB4BE] ">
              Bienvenido {{ authStore.user?.email || 'usuario' }}</p>
            <p class="mt-1 text-amber-200 text-xs">Rol: {{ authStore.rol || 'sin rol' }}</p>
          </div>

          <button
            class="rounded-xl
                   bg-[#46D5E5]
                   px-5 py-3
                   font-semibold
                   text-[#08141D]
                   transition
                   hover:bg-[#31C3D4]
                   hover:shadow-lg
                   hover:shadow-cyan-400/30"
          >
            Acción
          </button>
            <button class="ml-4 rounded-xl bg-[#46D5E5] px-5 py-3 font-semibold text-[#08141D] transition hover:bg-[#31C3D4] hover:shadow-lg hover:shadow-cyan-400/30" @click="handleLogout">
                Cerrar sesión
            </button>
        </div>
      </header>

      <!-- Contenido -->
      <section class="mx-auto max-w-7xl p-8">

        <!-- Cards superiores -->
        <div class="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

          <div
            class="rounded-3xl
                   border border-[#28414F]
                   bg-[#13222D]/70
                   p-6
                   backdrop-blur-xl
                   transition
                   hover:border-[#46D5E5]/40"
          >
            <p class="text-sm text-[#9DB4BE]">
              Usuarios
            </p>

            <h2 class="mt-3 text-4xl font-bold text-[#EAF4F6]">
              128
            </h2>
          </div>

          <div
            class="rounded-3xl
                   border border-[#28414F]
                   bg-[#13222D]/70
                   p-6
                   backdrop-blur-xl"
          >
            <p class="text-sm text-[#9DB4BE]">
              Equipos
            </p>

            <h2 class="mt-3 text-4xl font-bold text-[#EAF4F6]">
              54
            </h2>
          </div>

          <div
            class="rounded-3xl
                   border border-[#28414F]
                   bg-[#13222D]/70
                   p-6
                   backdrop-blur-xl"
          >
            <p class="text-sm text-[#9DB4BE]">
              Pendientes
            </p>

            <h2 class="mt-3 text-4xl font-bold text-[#EAF4F6]">
              12
            </h2>
          </div>

          <div
            class="rounded-3xl
                   border border-[#28414F]
                   bg-[#13222D]/70
                   p-6
                   backdrop-blur-xl"
          >
            <p class="text-sm text-[#9DB4BE]">
              Estado
            </p>

            <span
              class="mt-3 inline-flex rounded-full
                     bg-emerald-400/20
                     px-4 py-2
                     text-sm
                     font-semibold
                     text-emerald-300"
            >
              Operativo
            </span>
          </div>

        </div>

        <!-- Panel principal -->
        <div class="mt-8 grid gap-8 lg:grid-cols-3">

          <!-- Contenido -->
          <div
            class="lg:col-span-2
                   rounded-3xl
                   border border-[#28414F]
                   bg-[#13222D]/70
                   p-8
                   backdrop-blur-xl"
          >
            <h2 class="text-2xl font-bold text-[#EAF4F6]">
              Panel principal
            </h2>

            <p class="mt-3 text-[#9DB4BE] leading-relaxed">
              Este espacio está preparado para agregar tablas,
              gráficos, listados, estadísticas o cualquier otro
              contenido de tu aplicación.
            </p>

            <div
              class="mt-8 flex h-72 items-center justify-center
                     rounded-2xl border-2 border-dashed border-[#28414F]"
            >
              <span class="text-[#607984]">
                Área de contenido
              </span>
            </div>
          </div>

          <!-- Sidebar -->
          <aside
            class="rounded-3xl
                   border border-[#28414F]
                   bg-[#13222D]/70
                   p-8
                   backdrop-blur-xl"
          >
            <h2 class="text-xl font-bold text-[#EAF4F6]">
              Actividad
            </h2>

            <div class="mt-6 space-y-4">

              <div class="rounded-xl bg-[#0D1B24] p-4">
                <p class="font-medium text-[#EAF4F6]">
                  Última actualización
                </p>

                <p class="mt-1 text-sm text-[#9DB4BE]">
                  Hace unos minutos
                </p>
              </div>

              <div class="rounded-xl bg-[#0D1B24] p-4">
                <p class="font-medium text-[#EAF4F6]">
                  Sistema
                </p>

                <p class="mt-1 text-sm text-[#9DB4BE]">
                  Sin novedades.
                </p>
              </div>

            </div>
          </aside>

        </div>

      </section>

    </div>
  </main>
</template>

