import { createVuetify, ThemeDefinition } from 'vuetify'

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
    background: '#FFFFFF',
    surface: '#121214',
    primary: '#00DC82'
  }
}

export default defineNuxtPlugin(nuxtApp => {
  const vuetify = createVuetify({
    ssr: process.server,
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
