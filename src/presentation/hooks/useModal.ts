import { useEffect, useState } from 'react'

export const useModal = ({
	onOpenCallback,
	onCloseCallback
}: {
	onOpenCallback?: () => void
	onCloseCallback?: () => void
}) => {
	const [isOpen, setIsOpen] = useState(false)

	const open = () => {
		onOpenCallback?.()
		setIsOpen(true)
	}
	const close = () => {
		onCloseCallback?.()
		setIsOpen(false)
	}

	useEffect(() => {
		if (!isOpen && onCloseCallback) {
			onCloseCallback()
		}

		if (isOpen && onOpenCallback) {
			onOpenCallback()
		}
	}, [isOpen, onCloseCallback, onOpenCallback])

	return {
		isOpen,
		setIsOpen,
		open,
		close
	}
}
