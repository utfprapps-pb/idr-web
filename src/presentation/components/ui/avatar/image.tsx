import { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react'

import { Image as ImagePrimitive } from '@radix-ui/react-avatar'

import { cn } from '@/shared/utils'

export const Image = forwardRef<
	ElementRef<typeof ImagePrimitive>,
	ComponentPropsWithoutRef<typeof ImagePrimitive>
>(({ className, ...props }, ref) => (
	<ImagePrimitive
		ref={ref}
		className={cn('aspect-square h-full w-full', className)}
		{...props}
	/>
))

Image.displayName = ImagePrimitive.displayName
