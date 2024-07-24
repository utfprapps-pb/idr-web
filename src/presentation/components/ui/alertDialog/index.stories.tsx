import { Meta, StoryFn } from '@storybook/react/'

import { Button } from '../button'

import { AlertDialog } from '.'

export default {
	title: 'Components/UI/Alert Dialog'
} as Meta

const Template: StoryFn = () => (
	<AlertDialog.Root>
		<AlertDialog.Trigger asChild>
			<Button variant="outline">Show Dialog</Button>
		</AlertDialog.Trigger>
		<AlertDialog.Content>
			<AlertDialog.Header>
				<AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
				<AlertDialog.Description>
					This action cannot be undone. This will permanently delete your
					account and remove your data from our servers.
				</AlertDialog.Description>
			</AlertDialog.Header>
			<AlertDialog.Footer>
				<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
				<AlertDialog.Action>Continue</AlertDialog.Action>
			</AlertDialog.Footer>
		</AlertDialog.Content>
	</AlertDialog.Root>
)

export const Default = Template.bind({})
