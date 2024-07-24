import { type FC } from 'react'

import { AlertDialog } from '@/presentation/components/ui'

import type { DeleteContainerProps } from './types'

export const DeleteContainer: FC<DeleteContainerProps> = ({
	open,
	onOpenChange,
	title,
	description,
	buttonCancel,
	buttonConfirm
}) => (
	<AlertDialog.Root open={open} onOpenChange={onOpenChange}>
		{/* <AlertDialog.Trigger asChild>
			<Button variant="outline">Show Dialog</Button>
		</AlertDialog.Trigger> */}
		<AlertDialog.Content>
			<AlertDialog.Header>
				<AlertDialog.Title>{title}</AlertDialog.Title>
				<AlertDialog.Description>{description}</AlertDialog.Description>
			</AlertDialog.Header>
			<AlertDialog.Footer>
				<AlertDialog.Cancel onClick={buttonCancel.onClick}>
					{buttonCancel.text}
				</AlertDialog.Cancel>
				<AlertDialog.Action onClick={buttonConfirm.onClick}>
					{buttonConfirm.text}
				</AlertDialog.Action>
			</AlertDialog.Footer>
		</AlertDialog.Content>
	</AlertDialog.Root>
)
