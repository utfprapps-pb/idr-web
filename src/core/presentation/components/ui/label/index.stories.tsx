import { Meta, StoryFn } from '@storybook/react/'

import { Label, type LabelProps } from '.'

export default {
  title: 'Components/UI/Label',
  component: Label,
} as Meta

const Template: StoryFn<LabelProps> = (args) => <Label {...args} />

export const Default = Template.bind({})
Default.args = {
  children: 'Label',
}
