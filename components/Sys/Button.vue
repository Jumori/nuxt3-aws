<template>
  <v-btn
    :color="props.color"
    :loading="props.loading"
    :type="props.type"
    :disabled="props.disabled"
    :block="props.block"
    @click="handleClick"
  >
    <slot></slot>
    <template #loader>
      <div class="d-flex">
        {{ props.loadingText }}
        <v-progress-circular indeterminate size="20" width="3" />
      </div>
    </template>
  </v-btn>
</template>

<script setup lang="ts">
import { ButtonProps } from '../../@types/components/Sys/Button'

const props = withDefaults(defineProps<ButtonProps>(), {
  loading: false,
  loadingText: 'Carregando',
  color: 'primary',
  type: 'button',
  disabled: false,
  block: true
})

const emits = defineEmits<{
  (event: 'click'): void
}>()

const handleClick = () => {
  emits('click')
}
</script>
