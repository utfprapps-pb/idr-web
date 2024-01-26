import { PropsWithChildren, useState } from 'react'

import { Root } from '@radix-ui/react-popover'

export const PopoverRoot: React.FC<PropsWithChildren> = ({ children }) => {
	const [open, setOpen] = useState(false)

	return (
		<Root open={open} onOpenChange={() => setOpen(!open)}>
			{children}
		</Root>
	)
}
