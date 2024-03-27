import React from 'react'

import { cn } from '@/main/utils'

export const Cell = React.forwardRef<
	HTMLTableCellElement,
	React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
	<td
		ref={ref}
		className={cn('p-4 align-middle [&:has([role=checkbox])]:pr-0', className)}
		{...props}
	/>
))

Cell.displayName = 'TableCell'
