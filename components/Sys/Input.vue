<template>
  <div>
    <v-text-field
      :id="props.name"
      v-inputmask="inputmaskMask"
      :name="props.name"
      :value="veeValidateFieldValue"
      :label="props.label"
      :placeholder="props.placeholder"
      :type="props.type"
      :inputmode="props.inputmode"
      :disabled="props.disabled"
      :error-messages="errorMessage"
      @input="handleInput"
      @blur="handleBlur"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useField } from 'vee-validate'

import { getInputmaskMask } from '../../services/inputmask'
import { InputProps, InputEvent } from '../../@types/components/Sys/Input'

const props = withDefaults(defineProps<InputProps>(), {
  type: 'text',
  inputmode: 'text',
  disabled: false,
  placeholder: ''
})

const emits = defineEmits<{
  (event: 'update:value', value: string): string
  (event: 'blur', value: InputEvent): void
}>()

const {
  value: veeValidateFieldValue,
  errorMessage,
  handleChange: handleVeeValidateChange,
  handleBlur: handleVeeValidateBlur
} = useField(() => props.name, props.rules, {
  syncVModel: false,
  initialValue: props.value
})

const inputmaskMask = computed(() => {
  if (!props.inputmask) {
    return null
  }

  if (typeof props.inputmask === 'string') {
    return getInputmaskMask(props.inputmask)
  }

  return props.inputmask
})

const handleInput = (event: InputEvent) => {
  handleVeeValidateChange(event)
  emits('update:value', event.target.value)
}

const handleBlur = (event: InputEvent) => {
  handleVeeValidateBlur(event)
  emits('blur', event)
}
</script>
