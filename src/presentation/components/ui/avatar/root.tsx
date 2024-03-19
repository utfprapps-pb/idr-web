import React from 'react'

import { Root as RootRadix } from '@radix-ui/react-avatar'

import { cn } from '@/main/utils'

const Root = React.forwardRef<
	React.ElementRef<typeof RootRadix>,
	React.ComponentPropsWithoutRef<typeof RootRadix>
>(({ className, ...props }, ref) => (
	<RootRadix
		ref={ref}
		className={cn(
			'relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full',
			className
		)}
		{...props}
	/>
))

Root.displayName = RootRadix.displayName
export { Root }
