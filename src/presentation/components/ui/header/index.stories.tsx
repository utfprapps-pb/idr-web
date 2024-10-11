import { Meta, StoryFn } from '@storybook/react/'

import { Header, type HeaderProps } from '.'

export default {
	title: 'Components/UI/Header',
} as Meta

const Template: StoryFn<HeaderProps> = (args) => <Header {...args} />

export const WithFallbackUserProfile = Template.bind({})
WithFallbackUserProfile.args = {
	displayName: 'Guilherme Minozzi',
}

export const WithImageUserProfile = Template.bind({})
WithImageUserProfile.args = {
	displayName: 'Guilherme Minozzi',
	imageUrl: 'https://avatars.githubusercontent.com/u/61752597?v=4',
}
