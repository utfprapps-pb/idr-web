import React from 'react'

import { Separator as SeparatorRadix } from '@radix-ui/react-dropdown-menu'

import { cn } from '@/main/utils'

export const Separator = React.forwardRef<
	React.ElementRef<typeof SeparatorRadix>,
	React.ComponentPropsWithoutRef<typeof SeparatorRadix>
>(({ className, ...props }, ref) => (
	<SeparatorRadix
		ref={ref}
		className={cn('-mx-1 my-1 h-px bg-muted', className)}
		{...props}
	/>
))

Separator.displayName = SeparatorRadix.displayName
