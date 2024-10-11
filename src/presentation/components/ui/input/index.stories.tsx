import { Meta, StoryFn } from '@storybook/react/'

import { Input, type InputProps } from '.'

export default {
	title: 'Components/UI/Input',
	component: Input,
} as Meta

const Template: StoryFn<InputProps> = (args) => <Input {...args} />

export const Default = Template.bind({})
Default.args = {
	placeholder: 'Placeholder',
	disabled: true,
}
