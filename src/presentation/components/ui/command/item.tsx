import { forwardRef } from 'react'

import { Command as CommandPrimitive } from 'cmdk'

import { cn } from '@/main/utils'

export const Item = forwardRef<
	React.ElementRef<typeof CommandPrimitive.Item>,
	React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ className, ...props }, ref) => (
	<CommandPrimitive.Item
		ref={ref}
		className={cn(
			'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50',
			className
		)}
		{...props}
	/>
))

Item.displayName = CommandPrimitive.Item.displayName
