import type { Meta, StoryObj } from '@storybook/vue3'

import Index from '../../pages/index.vue'

const meta = {
  title: 'pages/Sign In',
  component: Index,
  render: (args: any) => ({
    components: { Index },
    setup() {
      return { args }
    }
  }),
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen'
  },
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {}
} satisfies Meta<typeof Index>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {}
}
