import React from 'react'

import { cn } from '@/main/utils'

export const Item = React.forwardRef<HTMLLIElement, React.ComponentProps<'li'>>(
	({ className, ...props }, ref) => (
		<li ref={ref} className={cn('', className)} {...props} />
	)
)

Item.displayName = 'PaginationItem'
