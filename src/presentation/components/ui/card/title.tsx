import React from 'react'

import { cn } from '@/main/utils'

export const Title = React.forwardRef<
	HTMLParagraphElement,
	React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
	<h3
		ref={ref}
		className={cn(
			'text-2xl font-semibold leading-none tracking-tight',
			className
		)}
		{...props}
	>
		{props.children}
	</h3>
))

Title.displayName = 'CardTitle'
