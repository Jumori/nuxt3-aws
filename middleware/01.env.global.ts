import { defineNuxtRouteMiddleware } from 'nuxt/app'
import { useEnvStore } from '../store/env'

export default defineNuxtRouteMiddleware(() => {
  const envStore = useEnvStore()

  if (!envStore.isLoaded) {
    envStore.setEnv({
      apiURL: `${process.env.NUXT_PUBLIC_API_BASE}${process.env.NUXT_PUBLIC_API_ENV}`,
      env: `${process.env.NUXT_PUBLIC_API_ENV}`
    })
  }
})
