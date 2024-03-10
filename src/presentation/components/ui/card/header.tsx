import React from 'react'

import { cn } from '@/main/utils'

export const Header = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn('flex flex-col gap-1.5', className)}
		{...props}
	/>
))

Header.displayName = 'CardHeader'
