import { createVuetify, ThemeDefinition } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const appDarkTheme: ThemeDefinition = {
  dark: true,
  colors: {
    background: '#121214',
    surface: '#C4C4CC',
    primary: '#00DC82'
  }
}

const appLightTheme: ThemeDefinition = {
  dark: false,
  colors: {
    surface: '#121214',
    background: '#FFFFFF',
    primary: '#00DC82'
  }
}

export default defineNuxtPlugin(nuxtApp => {
  const vuetify = createVuetify({
    ssr: true,
    components,
    directives,
    theme: {
      defaultTheme: 'appDarkTheme',
      themes: {
        appDarkTheme,
        appLightTheme
      },
      cspNonce: 'dQw4w9WgXcQ'
    }
  })

  nuxtApp.vueApp.use(vuetify)
})
