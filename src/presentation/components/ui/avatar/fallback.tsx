import React from 'react'

import { Fallback as FallbackRadix } from '@radix-ui/react-avatar'

import { cn } from '@/main/utils'

const Fallback = React.forwardRef<
	React.ElementRef<typeof FallbackRadix>,
	React.ComponentPropsWithoutRef<typeof FallbackRadix>
>(({ className, ...props }, ref) => (
	<FallbackRadix
		ref={ref}
		className={cn(
			'flex h-full w-full items-center justify-center rounded-full bg-muted',
			className
		)}
		{...props}
	/>
))

Fallback.displayName = FallbackRadix.displayName
export { Fallback }
