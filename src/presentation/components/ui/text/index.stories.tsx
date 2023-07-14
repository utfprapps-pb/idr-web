import React from 'react'

import { Meta, StoryFn } from '@storybook/react/'

import { Text, TextProps } from '.'

export default {
	title: 'Components/UI/Text',
	component: Text
} as Meta

const Template: StoryFn<TextProps> = (args) => <Text {...args} />

export const Default = Template.bind({})
Default.args = {
	children: 'Text Example',
	size: 'b1'
}
