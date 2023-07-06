export default defineNuxtConfig({
  ssr: true,

  imports: {
    autoImport: true
  },

  app: {
    cdnURL: process.env.NUXT_APP_CDN_URL,

    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1'
    }
  },

  components: [
    '~/components',
    { path: '~/components/Common', pathPrefix: false }
  ],

  css: ['vuetify/lib/styles/main.sass'],

  modules: ['@pinia/nuxt', '@pinia-plugin-persistedstate/nuxt'],

  build: {
    transpile: ['vuetify']
  },

  runtimeConfig: {
    public: {
      NUXT_PUBLIC_API_BASE: process.env.NUXT_PUBLIC_API_BASE,
      NUXT_PUBLIC_API_ENV: process.env.NUXT_PUBLIC_API_ENV
    }
  },

  pinia: {
    autoImports: [
      // automatically imports `defineStore`
      'defineStore' // import { defineStore } from 'pinia'
    ]
  },

  nitro: {
    preset: 'aws-lambda',
    devServer: {
      watch: ['./']
    }
  }
})
