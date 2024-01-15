import { Meta, StoryFn } from '@storybook/react/'
import React from 'react'

import { Popover, PopoverProps } from '.'

export default {
	title: 'Components/Navigation/Popover',
	component: Popover.Root
} as Meta

const Template: StoryFn<PopoverProps> = (args) => (
	<Popover.Root {...args}>
		<Popover.Trigger>
			<span>Open</span>
		</Popover.Trigger>
		<Popover.Content>Any content</Popover.Content>
	</Popover.Root>
)

export const Default = Template.bind({})
