<template>
  <v-app>
    <div class="d-flex flex-column">
      <header>
        <Logo
          height="50"
          width="50"
          :color="vuetifyTheme.current.value.colors.primary"
        />
      </header>

      <main>
        <slot />
      </main>
    </div>
  </v-app>
</template>

<script setup lang="ts">
import { useTheme } from 'vuetify'

const vuetifyTheme = useTheme()
</script>

<style lang="scss" scoped>
header {
  display: flex;
}
</style>
