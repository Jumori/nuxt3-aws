import { AnyObject } from 'yup'

export interface SwitchProps {
  name: string
  value: any

  inset?: boolean
  color?: string
  label?: string
  disabled?: boolean

  trueValue?: any
  falseValue?: any

  rules?: AnyObject
}
