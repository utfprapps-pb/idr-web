import { Meta, StoryFn } from '@storybook/react/'

import { Tooltip } from '.'

export default {
	title: 'Components/UI/Tooltip',
} as Meta

const Template: StoryFn = () => (
	<Tooltip.Provider>
		<Tooltip.Root>
			<Tooltip.Trigger>Hover</Tooltip.Trigger>
			<Tooltip.Content>
				<p>Add to library</p>
			</Tooltip.Content>
		</Tooltip.Root>
	</Tooltip.Provider>
)

export const Default = Template.bind({})
