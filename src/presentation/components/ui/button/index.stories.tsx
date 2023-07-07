import React from 'react'

import { Meta, StoryFn } from '@storybook/react/'
import { GithubLogo } from 'phosphor-react'

import { Button, ButtonProps } from '.'

export default {
	title: 'Components/UI/Button',
	component: Button.Root
} as Meta

const Template: StoryFn<ButtonProps> = (args) => (
	<Button.Root>
		<Button.Container {...args}>
			<Button.Icon icon={GithubLogo} />
			Label example
		</Button.Container>
	</Button.Root>
)

export const Default = Template.bind({})
Default.args = {
	disabled: false,
	onClick: () => null,
	theme: 'primary',
	type: 'button'
}
