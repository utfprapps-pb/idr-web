import React from 'react'

import { cn } from '@/main/utils'

export const List = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn('flex flex-col', 'gap-4', className)}
		{...props}
	/>
))

List.displayName = 'SidebarList'
