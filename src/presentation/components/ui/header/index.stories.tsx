import React from 'react'

import { Meta, StoryFn } from '@storybook/react/'
import { GithubLogo } from 'phosphor-react'

import { Header, HeaderProps } from '.'

export default {
	title: 'Components/UI/Header',
	component: Header
} as Meta

const Template: StoryFn<HeaderProps> = (args) => <Header {...args} />

export const Default = Template.bind({})
Default.args = {
	items: [
		{
			icon: <GithubLogo />,
			text: 'Github',
			onClick: () => alert('Github')
		}
	]
}
