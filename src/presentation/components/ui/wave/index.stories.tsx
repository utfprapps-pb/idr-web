import { Meta, StoryFn } from '@storybook/react/'

import { Wave } from './wave'

export default {
	title: 'Components/UI/Wave',
	component: Wave,
} as Meta

const Template: StoryFn = (args) => <Wave {...args} />

export const Default = Template.bind({})
