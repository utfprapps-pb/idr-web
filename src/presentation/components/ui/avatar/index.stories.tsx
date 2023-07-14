import { Meta, StoryFn } from '@storybook/react'

import { Avatar, AvatarProps } from '.'

export default {
	title: 'Components/UI/Avatar',
	component: Avatar
} as Meta

const AvatarTemplate: StoryFn<AvatarProps> = (args) => <Avatar {...args} />

export const Default = AvatarTemplate.bind({})
Default.args = {
	src: 'https://avatars.githubusercontent.com/u/55487022?v=4'
}

export const Square = AvatarTemplate.bind({})
Square.args = {
	src: 'https://avatars.githubusercontent.com/u/55487022?v=4',
	type: 'square'
}
