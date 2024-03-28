import React from 'react'

import { Label as LabelRadix } from '@radix-ui/react-dropdown-menu'

import { cn } from '@/main/utils'

export const Label = React.forwardRef<
	React.ElementRef<typeof LabelRadix>,
	React.ComponentPropsWithoutRef<typeof LabelRadix> & {
		inset?: boolean
	}
>(({ className, inset, ...props }, ref) => (
	<LabelRadix
		ref={ref}
		className={cn(
			'px-2 py-1.5 text-sm font-semibold',
			inset && 'pl-8',
			className
		)}
		{...props}
	/>
))

Label.displayName = LabelRadix.displayName
