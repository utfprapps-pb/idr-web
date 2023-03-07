import React from 'react'

import { Meta, StoryFn } from '@storybook/react/'

import { TextField, TextFieldProps } from '.'

export default {
	title: 'Components/TextField',
	component: TextField
} as Meta

const Template: StoryFn<TextFieldProps> = (args) => <TextField {...args} />

export const Default = Template.bind({})
Default.args = {
	label: 'Label Example',
	onChange: () => null
}
