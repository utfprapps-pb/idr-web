import { Meta, StoryFn } from '@storybook/react/'

import { Grouper, type GrouperProps } from '.'

export default {
  title: 'Components/Utils/Grouper',
  component: Grouper,
} as Meta

const Template: StoryFn<GrouperProps> = (args: GrouperProps) => (
  <Grouper {...args} className="bg-slate-900">
    <div className="flex align-middle justify-center bg-red-500">1</div>
    <div className="flex align-middle justify-center bg-red-500">2</div>
    <div className="flex align-middle justify-center bg-red-500">3</div>
    <div className="flex align-middle justify-center bg-red-500">4</div>
  </Grouper>
)

export const Default = Template.bind({})
