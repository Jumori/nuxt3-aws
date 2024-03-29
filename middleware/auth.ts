import { defineNuxtRouteMiddleware } from 'nuxt/app'
import { useAuthStore } from '../store/auth'

export default defineNuxtRouteMiddleware(() => {
  const authStore = useAuthStore()

  if (!authStore.isAuthenticated) {
    authStore.$reset()
    return navigateTo('/')
  }
})
