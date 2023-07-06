<template>
  <h1>Users {{ route.params.action }} {{ route.params.id }} page</h1>
</template>

<script setup lang="ts">
import { RouteLocationNormalized } from 'vue-router'

const route = useRoute()

definePageMeta({
  validate: (pageRoute: RouteLocationNormalized) => {
    const PAGE_ACTIONS = {
      withoutId: ['criar'],
      withId: ['ver', 'editar']
    }

    const pageAction = pageRoute.params.action as string
    const pageId = pageRoute.params.id
    const isPageWithId = PAGE_ACTIONS.withId.includes(pageAction)

    if (isPageWithId) {
      return PAGE_ACTIONS.withId.includes(pageAction) && pageId !== ''
    }

    return PAGE_ACTIONS.withoutId.includes(pageAction) && pageId === ''
  }
})
</script>
