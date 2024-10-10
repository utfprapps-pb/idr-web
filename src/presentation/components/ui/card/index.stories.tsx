import { Meta, StoryFn } from '@storybook/react/'

import { Card } from '.'

export default {
	title: 'Components/UI/Card',
} as Meta

const Template: StoryFn = () => (
	<Card.Container>
		<Card.Header>
			<Card.Title>Card Title</Card.Title>
			<Card.Description>Card Description</Card.Description>
		</Card.Header>
		<Card.Content>
			<p>Card Content</p>
		</Card.Content>
		<Card.Footer>
			<p>Card Footer</p>
		</Card.Footer>
	</Card.Container>
)

export const Default = Template.bind({})
