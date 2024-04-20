import { forwardRef } from 'react'

import { Title as TitlePrimitive } from '@radix-ui/react-dialog'

import { cn } from '@/main/utils'

export const Title = forwardRef<
	React.ElementRef<typeof TitlePrimitive>,
	React.ComponentPropsWithoutRef<typeof TitlePrimitive>
>(({ className, ...props }, ref) => (
	<TitlePrimitive
		ref={ref}
		className={cn(
			'text-lg font-semibold leading-none tracking-tight',
			className
		)}
		{...props}
	/>
))

Title.displayName = TitlePrimitive.displayName
