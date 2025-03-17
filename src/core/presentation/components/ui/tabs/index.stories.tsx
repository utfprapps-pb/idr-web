import { Meta, StoryFn } from '@storybook/react/'

import { Tabs } from '.'

export default {
  title: 'Components/UI/Tabs',
} as Meta

const Template: StoryFn = () => (
  <Tabs.Root defaultValue="account" className="w-[400px]">
    <Tabs.List>
      <Tabs.Trigger value="account">Account</Tabs.Trigger>
      <Tabs.Trigger value="password">Password</Tabs.Trigger>
    </Tabs.List>
    <Tabs.Content value="account">
      Make changes to your account here.
    </Tabs.Content>
    <Tabs.Content value="password">Change your password here.</Tabs.Content>
  </Tabs.Root>
)

export const Default = Template.bind({})
