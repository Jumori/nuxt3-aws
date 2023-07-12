import vuetify from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  ssr: true,

  imports: {
    autoImport: true
  },

  app: {
    cdnURL: process.env.NUXT_APP_CDN_URL,

    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: ''
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;700&display=swap'
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;700&display=swap'
        }
      ]
    }
  },

  components: [
    '~/components',
    { path: '~/components/Common', pathPrefix: false }
  ],

  css: [
    // 'vuetify/lib/styles/main.sass',
    '~/assets/scss/main.scss'
  ],

  modules: [
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    (_, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', config => {
        if (config.plugins) {
          config.plugins.push(vuetify())
        }
      })
    }
  ],

  build: {
    transpile: ['vuetify']
  },

  runtimeConfig: {
    public: {
      NUXT_PUBLIC_API_BASE: process.env.NUXT_PUBLIC_API_BASE,
      NUXT_PUBLIC_API_ENV: process.env.NUXT_PUBLIC_API_ENV
    }
  },

  nitro: {
    preset: 'aws-lambda',
    devServer: {
      watch: ['./']
    }
  }
})
