import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import Logo from '../../../components/Common/Logo.vue'
import type { LogoProps } from '../../../@types/components/Common/Logo'

describe('Logo component', () => {
  it('should be able to render logo component', () => {
    const wrapper = mount(Logo, {
      props: {
        height: 50,
        width: 50,
        color: '#FFF'
      } as LogoProps
    })

    expect(wrapper.find('svg')).toBeTruthy()
  })

  it('should be able to set logo component height', () => {
    const wrapper = mount(Logo, {
      props: {
        height: 50,
        width: 50,
        color: '#FFF'
      } as LogoProps
    })

    expect(wrapper.find('svg[height="50"]')).toBeTruthy()
  })

  it('should be able to set logo component width', () => {
    const wrapper = mount(Logo, {
      props: {
        height: 50,
        width: 50,
        color: '#FFF'
      } as LogoProps
    })

    expect(wrapper.find('svg[width="50"]')).toBeTruthy()
  })

  it('should be able to set logo component color', () => {
    const wrapper = mount(Logo, {
      props: {
        height: 50,
        width: 50,
        color: '#FFF'
      } as LogoProps
    })

    expect(wrapper.find('svg path[fill="#FFF"]')).toBeTruthy()
  })
})
