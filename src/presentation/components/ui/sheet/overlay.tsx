import { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react'

import { Overlay as OverlayPrimitive } from '@radix-ui/react-dialog'

import { cn } from '@/main/utils'

export const Overlay = forwardRef<
	ElementRef<typeof OverlayPrimitive>,
	ComponentPropsWithoutRef<typeof OverlayPrimitive>
>(({ className, ...props }, ref) => (
	<Overlay
		className={cn(
			'fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
			className
		)}
		{...props}
		ref={ref}
	/>
))

Overlay.displayName = OverlayPrimitive.displayName
