import { Meta, StoryFn } from '@storybook/react/'

import { Calendar } from '.'

export default {
  title: 'Components/UI/Calendar',
} as Meta

const Template: StoryFn = () => <Calendar selected={new Date()} />

export const Default = Template.bind({})
