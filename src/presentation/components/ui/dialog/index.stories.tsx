import { Meta, StoryFn } from '@storybook/react/'

import { Button } from '../button'
import { Input } from '../input'
import { Label } from '../label'

import { Dialog } from '.'

export default {
	title: 'Components/UI/Dialog'
} as Meta

const Template: StoryFn = () => (
	<Dialog.Root>
		<Dialog.Trigger asChild>
			<Button variant="outline">Edit Profile</Button>
		</Dialog.Trigger>
		<Dialog.Content className="sm:max-w-[425px]">
			<Dialog.Header>
				<Dialog.Title>Edit profile</Dialog.Title>
				<Dialog.Description>
					Make changes to your profile here. Click save when you are done.
				</Dialog.Description>
			</Dialog.Header>
			<div className="grid gap-4 py-4">
				<div className="grid grid-cols-4 items-center gap-4">
					<Label htmlFor="name" className="text-right">
						Name
					</Label>
					<Input id="name" defaultValue="Pedro Duarte" className="col-span-3" />
				</div>
				<div className="grid grid-cols-4 items-center gap-4">
					<Label htmlFor="username" className="text-right">
						Username
					</Label>
					<Input
						id="username"
						defaultValue="@peduarte"
						className="col-span-3"
					/>
				</div>
			</div>
			<Dialog.Footer>
				<Button type="submit">Save changes</Button>
			</Dialog.Footer>
		</Dialog.Content>
	</Dialog.Root>
)

export const Default = Template.bind({})
