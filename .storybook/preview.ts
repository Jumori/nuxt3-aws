import type { App } from 'vue'
import { setup, Preview } from '@storybook/vue3'
import type { Decorator } from '@storybook/vue3'

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
      ssr: false,
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
  },
  globalTypes: {
    theme: {
      description: 'Global theme for components',
      defaultValue: 'appDarkTheme',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: [
          {
            value: 'appDarkTheme',
            title: 'Light',
            left: '🌞'
          },
          {
            value: 'appLightTheme',
            title: 'Dark',
            left: '🌛'
          }
        ],
        dynamicTitle: true
      }
    }
  }
}

export const decorators: Decorator[] = []
export default preview
