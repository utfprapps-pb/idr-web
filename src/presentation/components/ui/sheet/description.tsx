import { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react'

import { Description as DescriptionPrimitive } from '@radix-ui/react-dialog'

import { cn } from '@/shared/utils'

export const Description = forwardRef<
	ElementRef<typeof DescriptionPrimitive>,
	ComponentPropsWithoutRef<typeof DescriptionPrimitive>
>(({ className, ...props }, ref) => (
	<DescriptionPrimitive
		ref={ref}
		className={cn('text-sm text-muted-foreground', className)}
		{...props}
	/>
))

Description.displayName = DescriptionPrimitive.displayName
