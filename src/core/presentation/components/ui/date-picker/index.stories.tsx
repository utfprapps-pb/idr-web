import { Meta, StoryFn } from '@storybook/react/'

import { DatePicker } from '.'

export default {
  title: 'Components/UI/DatePicker',
} as Meta

const Template: StoryFn = () => <DatePicker date={new Date()} />

export const Default = Template.bind({})
