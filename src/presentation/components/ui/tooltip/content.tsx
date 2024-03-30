import { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react'

import { Content as ContentPrimitive } from '@radix-ui/react-tooltip'

import { cn } from '@/main/utils'

export const Content = forwardRef<
	ElementRef<typeof ContentPrimitive>,
	ComponentPropsWithoutRef<typeof ContentPrimitive>
>(({ className, sideOffset = 4, ...props }, ref) => (
	<ContentPrimitive
		ref={ref}
		sideOffset={sideOffset}
		className={cn(
			'z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
			className
		)}
		{...props}
	/>
))

Content.displayName = ContentPrimitive.displayName
