import { Meta, StoryFn } from '@storybook/react/'

import { Combobox, type ComboboxProps } from '.'

export default {
	title: 'Components/UI/Combobox'
} as Meta

const Template: StoryFn<ComboboxProps> = (args) => <Combobox {...args} />

export const Default = Template.bind({})
Default.args = {
	handleSelect: (value) => {
		// eslint-disable-next-line no-alert
		alert(`value ${value}`)
	},

	items: [
		{
			value: '1',
			label: 'Um'
		},
		{
			value: '2',
			label: 'Dois'
		},
		{
			value: '3',
			label: 'Três'
		}
	]
}
