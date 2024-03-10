import React from 'react'

import { cn } from '@/main/utils'

export const Card = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn(
			'rounded-lg border bg-card text-card-foreground',
			'shadow-100 p-8 gap-9 flex flex-col',
			className
		)}
		{...props}
	/>
))

Card.displayName = 'Card'
