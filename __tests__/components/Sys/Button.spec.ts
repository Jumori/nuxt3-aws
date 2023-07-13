import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { vuetifyConfig } from '../../../services/vuetify'
import 'vuetify/styles'

import Button from '../../../components/Sys/Button.vue'
import type { ButtonProps } from '../../../@types/components/Sys/Button'

const vuetify = createVuetify({ ...vuetifyConfig, components, directives })

describe('SysButton component', () => {
  it('should be able to render SysButton component', () => {
    const wrapper = mount(Button, {
      global: {
        plugins: [vuetify]
      }
    })

    expect(wrapper.find('button.v-btn')).toBeTruthy()
  })

  it('should be able to set SysButton component default slot', () => {
    const wrapper = mount(Button, {
      slots: {
        default: 'Button Text'
      },
      global: {
        plugins: [vuetify]
      }
    })

    expect(wrapper.find('button.v-btn').element.textContent).toBe('Button Text')
  })

  it('should be able to set SysButton component color', () => {
    const wrapper = mount(Button, {
      props: {
        color: '#FFF'
      } as ButtonProps,
      global: {
        plugins: [vuetify]
      }
    })

    expect(
      getComputedStyle(wrapper.find('button.v-btn').element).getPropertyValue(
        'background-color'
      )
    ).toBe('rgb(255, 255, 255)')
  })

  it('should be able to set SysButton component disabled status', () => {
    const wrapper = mount(Button, {
      props: {
        disabled: true
      } as ButtonProps,
      global: {
        plugins: [vuetify]
      }
    })

    expect(
      wrapper.find('button.v-btn').element.attributes.getNamedItem('disabled')
    ).toBeTruthy()
  })

  it('should be able to emit SysButton click event', async () => {
    const wrapper = mount(Button, {
      global: {
        plugins: [vuetify]
      }
    })

    await wrapper.find('button.v-btn').trigger('click')
    expect(wrapper.emitted()).toHaveProperty('click')
  })
})
