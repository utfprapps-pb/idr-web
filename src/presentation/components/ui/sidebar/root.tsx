import React from 'react'

import { cn } from '@/main/utils'

export const Root = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<aside
		ref={ref}
		className={cn('flex flex-col', 'px-6 py-8', className)}
		{...props}
	/>
))

Root.displayName = 'SidebarRoot'
