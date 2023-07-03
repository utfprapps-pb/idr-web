import React from 'react'

import { Meta, StoryFn } from '@storybook/react'

import { InputGroup, InputGroupProps } from '.'

export default {
	title: 'Components/Form/Input Group',
	component: InputGroup
} as Meta

const Template: StoryFn<InputGroupProps> = (args) => (
	<InputGroup {...args}>
		<div>1</div>
		<div>2</div>
		<div>3</div>
		<div>4</div>
	</InputGroup>
)

export const Default = Template.bind({})
