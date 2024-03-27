import React from 'react'

import { Item as ItemRadix } from '@radix-ui/react-dropdown-menu'

import { cn } from '@/main/utils'

export const Item = React.forwardRef<
	React.ElementRef<typeof ItemRadix>,
	React.ComponentPropsWithoutRef<typeof ItemRadix> & {
		inset?: boolean
	}
>(({ className, inset, ...props }, ref) => (
	<ItemRadix
		ref={ref}
		className={cn(
			'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
			inset && 'pl-8',
			className
		)}
		{...props}
	/>
))

Item.displayName = ItemRadix.displayName
