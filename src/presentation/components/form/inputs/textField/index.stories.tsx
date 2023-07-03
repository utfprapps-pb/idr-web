import React from 'react'

import { Meta, StoryFn } from '@storybook/react/'
import { GithubLogo } from 'phosphor-react'

import { TextField } from '.'
import { TextFieldProviderProps } from './contexts/textFieldContext'

export default {
	title: 'Components/Form/Inputs/Text Field'
} as Meta

const Template: StoryFn<TextFieldProviderProps> = (args) => (
	<TextField.Root {...args} error="error">
		<TextField.Label label="Label Example" />
		<TextField.InputContainer>
			<TextField.Icons position="left">
				<TextField.Icon icon={<GithubLogo />} />
				<TextField.Icon icon={<GithubLogo />} />
				<TextField.Icon icon={<GithubLogo />} />
			</TextField.Icons>
			<TextField.Icons position="right" isWithError>
				<TextField.Icon icon={<GithubLogo />} />
				<TextField.Icon icon={<GithubLogo />} />
				<TextField.Icon icon={<GithubLogo />} />
			</TextField.Icons>
			<TextField.Input />
		</TextField.InputContainer>
		<TextField.Error />
	</TextField.Root>
)

export const Default = Template.bind({})