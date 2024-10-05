import { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react'

import { Title as TitlePrimitive } from '@radix-ui/react-dialog'

import { cn } from '@/shared/utils'

export const Title = forwardRef<
	ElementRef<typeof TitlePrimitive>,
	ComponentPropsWithoutRef<typeof TitlePrimitive>
>(({ className, ...props }, ref) => (
	<TitlePrimitive
		ref={ref}
		className={cn('text-lg font-semibold text-foreground', className)}
		{...props}
	/>
))

Title.displayName = TitlePrimitive.displayName
