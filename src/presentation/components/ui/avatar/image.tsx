import React from 'react'

import { Image as ImageRadix } from '@radix-ui/react-avatar'

import { cn } from '@/main/utils'

const Image = React.forwardRef<
	React.ElementRef<typeof ImageRadix>,
	React.ComponentPropsWithoutRef<typeof ImageRadix>
>(({ className, ...props }, ref) => (
	<ImageRadix
		ref={ref}
		className={cn('aspect-square h-full w-full', className)}
		{...props}
	/>
))

Image.displayName = ImageRadix.displayName
export { Image }
