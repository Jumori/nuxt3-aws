import { ThemeDefinition, VuetifyOptions } from 'vuetify'
import { aliases, mdi } from 'vuetify/lib/iconsets/mdi.mjs'
import { fa } from 'vuetify/lib/iconsets/fa.mjs'

export const appDarkTheme: ThemeDefinition = {
  dark: true,
  colors: {
    background: '#121214',
    surface: '#C4C4CC',
    primary: '#00DC82'
  }
}

export const appLightTheme: ThemeDefinition = {
  dark: false,
  colors: {
    background: '#FFFFFF',
    surface: '#121214',
    primary: '#00DC82'
  }
}

export const vuetifyConfig: VuetifyOptions = {
  theme: {
    defaultTheme: 'appDarkTheme',
    themes: {
      appDarkTheme,
      appLightTheme
    },
    cspNonce: 'dQw4w9WgXcQ'
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: { mdi, fa }
  }
}
