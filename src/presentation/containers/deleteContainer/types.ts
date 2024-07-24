export type DeleteContainerProps = {
	title: string
	description: string
	open: boolean
	onOpenChange: (isOpen: boolean) => void
	buttonConfirm: {
		text: string
		onClick: () => void
	}
	buttonCancel: {
		text: string
		onClick?: () => void
	}
}
