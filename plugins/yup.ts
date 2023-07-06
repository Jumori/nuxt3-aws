import * as yup from 'yup'
import '../services/yup'

declare module 'yup' {
  interface StringSchema extends yup.StringSchema {
    cpf(): StringSchema
  }
}

export default defineNuxtPlugin(() => {
  return {
    provide: {
      yup
    }
  }
})
