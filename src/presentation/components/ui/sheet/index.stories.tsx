import { Meta, StoryFn } from '@storybook/react/'

import { Button } from '../button'
import { Input } from '../input'
import { Label } from '../label'

import { ContentProps } from './content/types'

import { Sheet } from '.'

export default {
  title: 'Components/UI/Sheet',
} as Meta

const Template: StoryFn<ContentProps> = ({ side, ...args }) => (
  <Sheet.Root>
    <Sheet.Trigger asChild>
      <Button variant="outline">{side}</Button>
    </Sheet.Trigger>
    <Sheet.Content {...args} side={side}>
      <Sheet.Header>
        <Sheet.Title>Edit profile</Sheet.Title>
        <Sheet.Description>
          Make changes to your profile here. Click save when you are done.
        </Sheet.Description>
      </Sheet.Header>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Name
          </Label>
          <Input id="name" value="Pedro Duarte" className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="username" className="text-right">
            Username
          </Label>
          <Input id="username" value="@peduarte" className="col-span-3" />
        </div>
      </div>
      <Sheet.Footer>
        <Sheet.Close asChild>
          <Button className="w-full" type="submit" variant="outline">
            Close
          </Button>
        </Sheet.Close>

        <Sheet.Close asChild>
          <Button className="w-full" type="submit">
            Save changes
          </Button>
        </Sheet.Close>
      </Sheet.Footer>
    </Sheet.Content>
  </Sheet.Root>
)

export const Top = Template.bind({})
Top.args = {
  side: 'top',
}

export const Right = Template.bind({})
Right.args = {
  side: 'right',
}

export const Bottom = Template.bind({})
Bottom.args = {
  side: 'bottom',
}

export const Left = Template.bind({})
Left.args = {
  side: 'left',
}
