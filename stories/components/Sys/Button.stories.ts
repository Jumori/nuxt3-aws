import type { Meta, StoryObj } from '@storybook/vue3'

import SysButton from '../../../components/Sys/Button.vue'

const meta = {
  title: 'components/Sys/Button',
  component: SysButton,
  render: (args: any) => ({
    components: { SysButton },
    setup() {
      return { args }
    },
    template: `<SysButton v-bind="args">${args.default}</SysButton>`
  }),
  parameters: {
    layout: 'fullscreen'
  },
  tags: ['autodocs'],
  argTypes: {
    loading: {
      control: 'boolean'
    },
    loadingText: {
      control: 'string'
    },
    color: {
      control: 'color'
    },
    type: {
      control: 'string'
    },
    disabled: {
      control: 'boolean'
    },
    block: {
      control: 'boolean'
    }
  }
} satisfies Meta<typeof SysButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    default: 'Botão'
  }
}
