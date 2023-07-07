<template>
  <v-switch
    :id="props.name"
    :name="props.name"
    :inset="props.inset"
    :color="props.color"
    :label="props.label"
    :disabled="props.disabled"
    :true-value="props.trueValue"
    :false-value="props.falseValue"
    :model-value="veeValidateFieldValue"
    :error-messages="errorMessage"
    @update:model-value="handleChange"
  >
    <slot></slot>
  </v-switch>
</template>

<script setup lang="ts">
import { useField } from 'vee-validate'

import { SwitchProps } from '../../@types/components/Sys/Switch'

const props = withDefaults(defineProps<SwitchProps>(), {
  inset: false,
  color: '#FFF',
  label: '',
  disabled: false,
  trueValue: undefined,
  falseValue: undefined
})

const emits = defineEmits<{
  (event: 'update:value', value: string): string
}>()

const {
  value: veeValidateFieldValue,
  errorMessage,
  handleChange: handleVeeValidateChange
} = useField(() => props.name, props.rules, {
  syncVModel: false,
  initialValue: props.value
})

const handleChange = (value: any) => {
  handleVeeValidateChange(value)
  emits('update:value', value)
}
</script>
