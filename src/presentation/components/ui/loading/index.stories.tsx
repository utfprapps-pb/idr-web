import { Meta, StoryFn } from '@storybook/react/'

import { Loading, type LoadingProps } from '.'

export default {
	title: 'Components/UI/Loading',
	component: Loading,
} as Meta

const Template: StoryFn<LoadingProps> = (args) => <Loading {...args} />

export const Default = Template.bind({})
