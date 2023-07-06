import Inputmask from 'inputmask'

export interface InputmaskDictionaryItem {
  [key: string]: Inputmask.Options
}

export const inputmaskDictionary: InputmaskDictionaryItem = {
  phone: {
    mask: ['(99) 9999-9999', '(99) 99999-9999'],
    jitMasking: true,
    greedy: false,
    keepStatic: true,
    autoUnmask: true
  },
  cpf: {
    mask: '999.999.999-99',
    jitMasking: true,
    greedy: false,
    keepStatic: true,
    autoUnmask: true
  },
  zipcode: {
    mask: '99999-999',
    jitMasking: true,
    greedy: false,
    keepStatic: true,
    autoUnmask: true
  },
  date: {
    mask: '99/99/9999',
    jitMasking: true,
    greedy: false,
    keepStatic: true,
    autoUnmask: true,
    onBeforeMask(val: string) {
      if (val.includes('-')) {
        return val.split('-').reverse().join('/')
      }

      return val
    },
    onUnMask(maskedValue: string) {
      if (maskedValue.includes('/')) {
        return maskedValue.split('/').reverse().join('-')
      }

      return maskedValue
    }
  }
}

export const getInputmaskMask = (
  mask: string,
  dict: InputmaskDictionaryItem = inputmaskDictionary
) => {
  type ObjectKey = keyof typeof dict
  const maskKey = mask as ObjectKey

  return mask in dict ? dict[maskKey] : null
}
