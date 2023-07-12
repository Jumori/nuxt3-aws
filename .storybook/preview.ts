import type { App } from 'vue'
import { setup, Preview } from '@storybook/vue3'

import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { vuetifyConfig } from '../services/vuetify'

setup((app: App) => {
  app.use(createPinia().use(piniaPluginPersistedstate))
  app.use(
    createVuetify({
      ...vuetifyConfig,
      ssr: true,
      components,
      directives,
    })
  )
})

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    }
  }
}

export const decorators = []
export default preview
