import React from 'react'

import { Meta, StoryFn } from '@storybook/react'

import { DebounceTextField, DebounceTextFieldProps } from '.'

export default {
	title: 'Components/Debounce Text Field',
	component: DebounceTextField
} as Meta

const Template: StoryFn<DebounceTextFieldProps> = (args) => (
	<DebounceTextField {...args} />
)

export const Default = Template.bind({})
Default.args = {
	label: 'Label Example',
	onSearch: () => null
}
