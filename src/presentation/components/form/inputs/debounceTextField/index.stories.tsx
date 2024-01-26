import { Meta, StoryFn } from '@storybook/react'

import { DebounceTextField, DebounceTextFieldProps } from '.'

export default {
	title: 'Components/Form/Inputs/Debounce Text Field',
	component: DebounceTextField
} as Meta

const Template: StoryFn<DebounceTextFieldProps> = (args) => (
	<DebounceTextField {...args} />
)

export const Default = Template.bind({})
Default.args = {
	label: 'Label Example',
	callbackLoading: false,
	callback: () => null
}
