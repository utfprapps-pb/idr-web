import { forwardRef, ComponentProps } from 'react'

import { cn } from '@/main/utils'

export const Item = forwardRef<HTMLLIElement, ComponentProps<'li'>>(
	({ className, ...props }, ref) => (
		<li ref={ref} className={cn('', className)} {...props} />
	)
)

Item.displayName = 'PaginationItem'
