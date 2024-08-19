import { forwardRef } from 'react'

import { Command as CommandPrimitive } from 'cmdk'

import { cn } from '@/shared/utils'

export const Root = forwardRef<
	React.ElementRef<typeof CommandPrimitive>,
	React.ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({ className, ...props }, ref) => (
	<CommandPrimitive
		ref={ref}
		className={cn(
			'flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground',
			className
		)}
		{...props}
	/>
))

Root.displayName = CommandPrimitive.displayName
