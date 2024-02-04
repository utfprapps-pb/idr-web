import { Meta, StoryFn } from '@storybook/react/'

import { Button, type IButtonProps } from '.'

export default {
	title: 'Components/UI/Button',
	component: Button
} as Meta

const Template: StoryFn<IButtonProps> = (args) => (
	<Button {...args}>Click me!</Button>
)

export const Default = Template.bind({})
