import { useState } from 'react'

import { DropdownMenuCheckboxItemProps } from '@radix-ui/react-dropdown-menu'
import { Meta, StoryFn } from '@storybook/react/'

import { Button } from '@/presentation/components/ui/button'

import { DropdownMenu } from '.'

export default {
  title: 'Components/UI/DropdownMenu',
} as Meta

type Checked = DropdownMenuCheckboxItemProps['checked']

const TemplateDefault: StoryFn = () => (
  <DropdownMenu.Root>
    <DropdownMenu.Trigger>Open</DropdownMenu.Trigger>
    <DropdownMenu.Content>
      <DropdownMenu.Label>My Account</DropdownMenu.Label>
      <DropdownMenu.Separator />
      <DropdownMenu.Item>Profile</DropdownMenu.Item>
      <DropdownMenu.Item>Billing</DropdownMenu.Item>
      <DropdownMenu.Item>Team</DropdownMenu.Item>
      <DropdownMenu.Item>Subscription</DropdownMenu.Item>
    </DropdownMenu.Content>
  </DropdownMenu.Root>
)

const TemplateCheckbox: StoryFn = () => {
  const [showStatusBar, setShowStatusBar] = useState<Checked>(true)
  const [showActivityBar, setShowActivityBar] = useState<Checked>(false)
  const [showPanel, setShowPanel] = useState<Checked>(false)

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button variant="outline">Open</Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content className="w-56">
        <DropdownMenu.Label>Appearance</DropdownMenu.Label>
        <DropdownMenu.Separator />
        <DropdownMenu.CheckboxItem
          checked={showStatusBar}
          onCheckedChange={setShowStatusBar}
        >
          Status Bar
        </DropdownMenu.CheckboxItem>
        <DropdownMenu.CheckboxItem
          checked={showActivityBar}
          onCheckedChange={setShowActivityBar}
          disabled
        >
          Activity Bar
        </DropdownMenu.CheckboxItem>
        <DropdownMenu.CheckboxItem
          checked={showPanel}
          onCheckedChange={setShowPanel}
        >
          Panel
        </DropdownMenu.CheckboxItem>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}

const TemplateRadioGroup: StoryFn = () => {
  const [position, setPosition] = useState('bottom')

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button variant="outline">Open</Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content className="w-56">
        <DropdownMenu.Label>Panel Position</DropdownMenu.Label>
        <DropdownMenu.Separator />
        <DropdownMenu.RadioGroup value={position} onValueChange={setPosition}>
          <DropdownMenu.RadioItem value="top">Top</DropdownMenu.RadioItem>
          <DropdownMenu.RadioItem value="bottom">Bottom</DropdownMenu.RadioItem>
          <DropdownMenu.RadioItem value="right">Right</DropdownMenu.RadioItem>
        </DropdownMenu.RadioGroup>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}

export const Default = TemplateDefault.bind({})
export const WithCheckbox = TemplateCheckbox.bind({})
export const WithRadioGroup = TemplateRadioGroup.bind({})
