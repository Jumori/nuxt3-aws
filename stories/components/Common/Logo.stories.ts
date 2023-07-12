import type { Meta, StoryObj } from '@storybook/vue3'

import Logo from '../../../components/Common/Logo.vue'

const meta = {
  title: 'components/Common/Logo',
  component: Logo,
  render: (args: any) => ({
    components: { Logo },
    setup() {
      return { args }
    },
    template: '<Logo v-bind="args" />'
  }),
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen'
  },
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'text'
    },
    height: {
      control: 'text'
    },
    width: {
      control: 'text'
    }
  }
} satisfies Meta<typeof Logo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    color: '#00DC82',
    height: '50',
    width: '50'
  }
}
