import React from 'react'

import { Meta, StoryFn } from '@storybook/react/'
import { Lock } from 'phosphor-react'

import { Button, ButtonProps } from '.'

export default {
	title: 'Components/UI/Button',
	component: Button
} as Meta

const Template: StoryFn<ButtonProps> = (args) => <Button {...args} />

export const Default = Template.bind({})
Default.args = {
	children: 'Label Example',
	icon: <Lock />
}
