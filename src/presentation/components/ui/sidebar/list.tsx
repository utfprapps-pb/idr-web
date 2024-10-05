import { forwardRef, HTMLAttributes } from 'react'

import { cn } from '@/shared/utils'

export const List = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
	({ className, ...props }, ref) => (
		<div
			ref={ref}
			className={cn('flex flex-col', 'gap-4', className)}
			{...props}
		/>
	)
)

List.displayName = 'SidebarList'
