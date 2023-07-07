import { useTheme } from 'vuetify'

export interface AppState {
  theme: 'light' | 'dark' | ''
}

export const useAppStore = defineStore(
  'app',
  () => {
    const vuetifyTheme = useTheme()

    const theme = ref('dark')
    const runtimeThemes = ref<{} | null>(null)

    const setTheme = (themeValue: AppState['theme']) => {
      theme.value = themeValue
    }

    const generateRandomColor = () => {
      return Math.floor(Math.random() * 16777215).toString(16)
    }

    const setRuntimeThemes = (retrieve = false) => {
      if (!retrieve) {
        const randomColor = generateRandomColor()

        const clonedDefaultThemes = JSON.parse(
          JSON.stringify(
            Object.entries(vuetifyTheme.computedThemes.value).filter(
              ([computedThemeName]) =>
                computedThemeName.toLowerCase().includes('app')
            )
          )
        ).map((theme: [string, {}]) => {
          const themeConfigs = JSON.parse(JSON.stringify(theme[1]))
          themeConfigs.colors.primary = `#${randomColor}`

          return [theme[0], themeConfigs]
        })

        runtimeThemes.value = {
          runtimeLightTheme: {
            ...clonedDefaultThemes.find(([themeName]: [string]) =>
              themeName.toLowerCase().includes('light')
            )[1]
          },
          runtimeDarkTheme: {
            ...clonedDefaultThemes.find(([themeName]: [string]) =>
              themeName.toLowerCase().includes('dark')
            )[1]
          }
        }
      }

      vuetifyTheme.themes.value = {
        ...vuetifyTheme.themes.value,
        ...runtimeThemes.value
      }

      vuetifyTheme.global.name.value =
        theme.value === 'dark' ? 'runtimeDarkTheme' : 'runtimeLightTheme'
    }

    const removeRuntimeThemes = () => {
      const clonedDynamicThemes = JSON.parse(
        JSON.stringify(
          Object.entries(vuetifyTheme.computedThemes.value).filter(
            ([computedThemeName]) =>
              !computedThemeName.toLowerCase().includes('runtime')
          )
        )
      )

      vuetifyTheme.global.name.value =
        Object.entries(vuetifyTheme.computedThemes.value)
          .filter(([computedThemeName]) =>
            computedThemeName.toLowerCase().includes('app')
          )
          .find(([computedThemeName]) =>
            computedThemeName.toLowerCase().includes(theme.value)
          )?.[0] || 'dark'

      runtimeThemes.value = null

      vuetifyTheme.themes.value = clonedDynamicThemes.reduce(
        (acc: {}, [themeName, themeConfig]: [string, {}]) => {
          return {
            ...acc,
            [themeName]: themeConfig
          }
        },
        {}
      )
    }

    return {
      theme,
      runtimeThemes,
      setTheme,
      setRuntimeThemes,
      removeRuntimeThemes
    }
  },
  {
    persist: true
  }
)
