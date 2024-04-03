import React from 'react'

import { cn } from '@/main/utils'

export const Content = React.forwardRef<
	HTMLUListElement,
	React.ComponentProps<'ul'>
>(({ className, ...props }, ref) => (
	<ul
		ref={ref}
		className={cn('flex flex-row items-center gap-1', className)}
		{...props}
	/>
))

Content.displayName = 'PaginationContent'
