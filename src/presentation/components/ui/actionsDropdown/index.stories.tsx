import React from 'react'

import { Meta, StoryFn } from '@storybook/react/'
import { GithubLogo, InstagramLogo, YoutubeLogo } from 'phosphor-react'

import { ActionsDropdown } from '.'

export default {
	title: 'Components/UI/Actions Dropdown',
	component: ActionsDropdown.Root
} as Meta

export const ActionsDropdownWithIconTemplate: StoryFn = () => (
	<ActionsDropdown.Root>
		<ActionsDropdown.Item onClick={() => null}>
			<ActionsDropdown.Icon icon={GithubLogo} />
			<ActionsDropdown.Text text="Github" />
		</ActionsDropdown.Item>

		<ActionsDropdown.Item onClick={() => null}>
			<ActionsDropdown.Icon icon={InstagramLogo} />
			<ActionsDropdown.Text text="Instagram" />
		</ActionsDropdown.Item>

		<ActionsDropdown.Item onClick={() => null}>
			<ActionsDropdown.Icon icon={YoutubeLogo} />
			<ActionsDropdown.Text text="Youtube" />
		</ActionsDropdown.Item>
	</ActionsDropdown.Root>
)

export const ActionsDropdownWithoutIconTemplate: StoryFn = () => (
	<ActionsDropdown.Root>
		<ActionsDropdown.Item onClick={() => null}>
			<ActionsDropdown.Text text="Github" />
		</ActionsDropdown.Item>

		<ActionsDropdown.Item onClick={() => null}>
			<ActionsDropdown.Text text="Instagram" />
		</ActionsDropdown.Item>

		<ActionsDropdown.Item onClick={() => null}>
			<ActionsDropdown.Text text="Youtube" />
		</ActionsDropdown.Item>
	</ActionsDropdown.Root>
)
