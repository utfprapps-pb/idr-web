import React from 'react'

import { Meta, StoryFn } from '@storybook/react/'
import { Lock } from 'phosphor-react'

import { TextField, TextFieldProps } from '.'

export default {
	title: 'Components/Text Field',
	component: TextField
} as Meta

const Template: StoryFn<TextFieldProps> = (args) => <TextField {...args} />

export const Default = Template.bind({})
Default.args = {
	label: 'Label Example',
	iconsStart: [<Lock key="lock" />]
}
