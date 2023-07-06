<template>
  <div>
    <h1>Index page</h1>
    <p>Env: {{ runtimeConfig.public.NUXT_PUBLIC_API_ENV }}</p>

    <v-container>
      <v-form ref="form" @submit.prevent="handleSubmit">
        <SysInput
          v-for="(field, fieldIdx) in formFields"
          :key="field.name"
          class="my-2"
          :name="field.name"
          :label="field.label"
          :value="formFields[fieldIdx].value"
          :inputmode="field.inputmode || 'text'"
          :type="field.type || 'text'"
          :inputmask="field.inputmask"
          :rules="field.rules"
          v-bind="field.name"
          @update:value="value => handleInput(value, fieldIdx)"
        />

        <pre class="my-2">{{ values }}</pre>

        <SysButton type="submit" :disabled="!meta.valid"> Submit </SysButton>
      </v-form>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useForm } from 'vee-validate'
import * as yup from 'yup'

import { InputProps } from '../@types/components/Sys/Input'

const runtimeConfig = useRuntimeConfig()

const formFields = ref<InputProps[]>([
  {
    name: 'email',
    label: 'Endereço de e-mail',
    value: '',
    inputmode: 'email',
    type: 'email',
    rules: yup.string().email().required()
  },
  {
    name: 'cpf',
    label: 'CPF',
    value: '',
    type: 'text',
    rules: yup.string().required(),
    inputmask: 'cpf'
  },
  {
    name: 'password',
    label: 'Senha',
    value: '',
    type: 'password',
    rules: yup.string().min(6).required()
  }
])

const {
  values,
  defineComponentBinds,
  handleSubmit: handleVeeValidateSubmit,
  meta
} = useForm({
  validationSchema: yup.object().shape(
    formFields.value.reduce(
      (acc: { [key: string]: any }, field: InputProps) => {
        if (field.rules) {
          return { ...acc, [field.name]: field.rules }
        }

        return acc
      },
      {}
    )
  )
})

const fieldBinds = formFields.value.map((field: InputProps) => {
  return defineComponentBinds(field.name, (state): {} => {
    return {
      validateOnModelUpdate: state.errors.length > 0,
      validateOnBlur: true,
      model: 'value',
      props: {
        error: state.errors[0]
      }
    }
  })
})

const handleInput = (value: string, fieldIdx: number) => {
  formFields.value[fieldIdx].value = value
}

const handleSubmit = handleVeeValidateSubmit(values => {
  alert(JSON.stringify(values, null, 2))
})

onMounted(() => {
  console.log(fieldBinds)
})
</script>
