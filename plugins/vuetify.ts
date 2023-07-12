import { createVuetify } from 'vuetify'

import { vuetifyConfig } from '../services/vuetify'

export default defineNuxtPlugin(nuxtApp => {
  const vuetify = createVuetify({ ...vuetifyConfig, ssr: process.server })

  nuxtApp.vueApp.use(vuetify)
})
