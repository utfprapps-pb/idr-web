import { Meta, StoryFn } from '@storybook/react/'
import { GithubLogo } from 'phosphor-react'

import { Menu } from '.'

export default {
	title: 'Components/Navigation/Menu'
} as Meta

const Template: StoryFn = () => (
	<Menu.Root>
		<Menu.Logo>Logo</Menu.Logo>
		<Menu.Container>
			<Menu.Item active to="/home">
				<Menu.ItemIcon icon={GithubLogo} />
				<Menu.ItemText text="Github" />
			</Menu.Item>
			<Menu.Item active={false} to="/otherPage">
				<Menu.ItemText text="Other Page" />
			</Menu.Item>
		</Menu.Container>
	</Menu.Root>
)

export const Default = Template.bind({})
