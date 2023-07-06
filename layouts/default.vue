<template>
  <v-app>
    <div class="d-flex flex-column">
      <header>
        <Logo height="50" width="50" />
      </header>

      <main>
        <slot />
      </main>
    </div>
  </v-app>
</template>

<style lang="scss" scoped>
header {
  display: flex;
}
</style>
