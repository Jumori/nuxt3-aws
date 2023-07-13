import type { Meta, StoryObj } from '@storybook/vue3'

import Index from '../../pages/index.vue'

const meta = {
  title: 'pages/Sign In',
  component: Index,
  render: (args: any) => ({
    components: { Index },
    setup() {
      return { args }
    },
    template: `
      <v-app>
        <v-main>
          <Index v-bind="args"/>
        </v-main>
      </v-app>
    `
  }),
  parameters: {
    layout: 'fullscreen'
  },
  tags: ['autodocs'],
  argTypes: {}
} satisfies Meta<typeof Index>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {}
}
