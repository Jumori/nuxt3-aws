import * as yup from 'yup'

yup.addMethod<yup.StringSchema>(yup.string, 'cpf', () => {
  return yup
    .string()
    .test('cpf', 'CPF inválido', (value: string | undefined) => {
      if (!value) return false

      const cleanCpf = value.replace(/\D/g, '')
      let sum = 0
      let rest
      const valueWithoutRepeatedCharacters = cleanCpf
        .split('')
        .filter((character, index, self) => {
          return self.indexOf(character) === index
        })
        .join('')

      if (valueWithoutRepeatedCharacters.length <= 1) {
        return false
      }

      for (let i = 1; i <= 9; i++) {
        sum = sum + parseInt(cleanCpf.substring(i - 1, i)) * (11 - i)
      }
      rest = (sum * 10) % 11

      if (rest === 10 || rest === 11) {
        rest = 0
      }
      if (rest !== parseInt(cleanCpf.substring(9, 10))) {
        return false
      }

      sum = 0
      for (let i = 1; i <= 10; i++) {
        sum = sum + parseInt(cleanCpf.substring(i - 1, i)) * (12 - i)
      }
      rest = (sum * 10) % 11

      if (rest === 10 || rest === 11) {
        rest = 0
      }
      if (rest !== parseInt(cleanCpf.substring(10, 11))) {
        return false
      }
      return true
    })
})
