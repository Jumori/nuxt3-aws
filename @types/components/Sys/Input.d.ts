import Inputmask from 'inputmask'
import { AnyObject } from 'yup'

export interface InputProps {
  name: string
  value: string | number | null
  label: string

  type?: string
  inputmode?: string
  disabled?: boolean
  placeholder?: string

  inputmask?: Inputmask.Options | string

  rules?: AnyObject
}

export interface InputEvent extends Event {
  target: HTMLInputElement
}
