<template>
  <v-app>
    <div class="d-flex flex-column">
      <header>
        <ClientOnly>
          <Logo
            height="50"
            width="50"
            :color="vuetifyTheme.current.value.colors.primary"
          />

          <SysSwitch
            name="theme"
            label="Dark Mode"
            true-value="dark"
            false-value="light"
            :value="appStore.$state.theme"
            :color="vuetifyTheme.current.value.colors.primary"
            @update:value="handleToggleTheme"
          />
        </ClientOnly>
      </header>

      <main>
        <slot />
      </main>
    </div>
  </v-app>
</template>

<script setup lang="ts">
import { useTheme } from 'vuetify'

import { AppState, useAppStore } from '../store/app'

const vuetifyTheme = useTheme()
const appStore = useAppStore()

const handleToggleTheme = (theme: any) => {
  const themes = Object.entries(vuetifyTheme.computedThemes.value).filter(
    ([computedThemeName]) =>
      computedThemeName.toLowerCase().includes('app') ||
      computedThemeName.toLowerCase().includes('runtime')
  )
  const currentThemeName = vuetifyTheme.global.name

  const toggledTheme = theme as AppState['theme']
  appStore.setTheme(toggledTheme)

  vuetifyTheme.global.name.value =
    themes.find(
      ([computedThemeName]) =>
        computedThemeName.toLowerCase().includes(appStore.$state.theme) &&
        computedThemeName
          .toLowerCase()
          .includes(
            currentThemeName.value
              .replace(/([a-z])([A-Z])/g, '$1 $2')
              .split(' ')[0]
          )
    )?.[0] || 'dark'
}

onBeforeMount(() => {
  appStore.setTheme(vuetifyTheme.current.value.dark ? 'dark' : 'light')

  if (appStore.runtimeThemes) {
    appStore.setRuntimeThemes(true)
  }
})
</script>

<style lang="scss" scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
