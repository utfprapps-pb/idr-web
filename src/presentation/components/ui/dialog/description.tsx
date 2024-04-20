import { forwardRef } from 'react'

import { Description as DescriptionPrimitive } from '@radix-ui/react-dialog'

import { cn } from '@/main/utils'

export const Description = forwardRef<
	React.ElementRef<typeof DescriptionPrimitive>,
	React.ComponentPropsWithoutRef<typeof DescriptionPrimitive>
>(({ className, ...props }, ref) => (
	<DescriptionPrimitive
		ref={ref}
		className={cn('text-sm text-muted-foreground', className)}
		{...props}
	/>
))

Description.displayName = DescriptionPrimitive.displayName
