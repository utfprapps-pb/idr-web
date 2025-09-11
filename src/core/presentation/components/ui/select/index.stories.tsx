import { Meta, StoryFn } from '@storybook/react/'

import { Select } from '.'

export default {
  title: 'Components/UI/Select',
} as Meta

const Template: StoryFn = () => (
  <Select.Root>
    <Select.Trigger className="w-[180px]">
      <Select.Value placeholder="Theme" />
    </Select.Trigger>
    <Select.Content>
      <Select.Item value="light">Light</Select.Item>
      <Select.Item value="dark">Dark</Select.Item>
      <Select.Item value="system">System</Select.Item>
    </Select.Content>
  </Select.Root>
)

export const Default = Template.bind({})
