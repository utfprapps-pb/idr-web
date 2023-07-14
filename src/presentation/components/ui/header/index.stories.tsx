import React from 'react'

import { Meta, StoryFn } from '@storybook/react/'
import { CaretDown } from 'phosphor-react'

import { Header } from '.'
import { Popover } from '../../navigation'
import { ActionsDropdown } from '../actionsDropdown'
import { Avatar } from '../avatar'
import { Text } from '../text'

export default {
	title: 'Components/UI/Header',
	component: Header.Root
} as Meta

export const WithUserContentTemplate: StoryFn = () => (
	<Header.Root>
		<Header.UserContent>
			<Avatar
				src="https://avatars.githubusercontent.com/u/61752597?v=4"
				alt="User profile"
			/>
			<Text size="b2" color="text">
				Guilherme Minozzi
			</Text>
			<Popover.Root>
				<Popover.Trigger>
					<CaretDown />
				</Popover.Trigger>

				<Popover.Content>
					<ActionsDropdown.Root>
						<ActionsDropdown.Item onClick={() => null}>
							<ActionsDropdown.Text text="Profile" />
						</ActionsDropdown.Item>

						<ActionsDropdown.Item onClick={() => null}>
							<ActionsDropdown.Text text="Logout" />
						</ActionsDropdown.Item>
					</ActionsDropdown.Root>
				</Popover.Content>
			</Popover.Root>
		</Header.UserContent>
	</Header.Root>
)

export const WithoutUserContentTemplate: StoryFn = () => <Header.Root />
