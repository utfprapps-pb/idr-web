import { forwardRef } from 'react'

import { Command as CommandPrimitive } from 'cmdk'

import { cn } from '@/shared/utils'

export const Separator = forwardRef<
	React.ElementRef<typeof CommandPrimitive.Separator>,
	React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, ref) => (
	<CommandPrimitive.Separator
		ref={ref}
		className={cn('-mx-1 h-px bg-border', className)}
		{...props}
	/>
))

Separator.displayName = CommandPrimitive.Separator.displayName
