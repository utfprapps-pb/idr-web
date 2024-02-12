import { Meta, StoryFn } from '@storybook/react/'

import { Button, type ButtonProps } from '.'

export default {
	title: 'Components/UI/Button',
	component: Button
} as Meta

const Template: StoryFn<ButtonProps> = (args) => (
	<Button {...args}>Click me!</Button>
)

export const Default = Template.bind({})
