import { forwardRef, TdHTMLAttributes } from 'react'

import { cn } from '@/shared/utils'

export const Cell = forwardRef<
	HTMLTableCellElement,
	TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
	<td
		ref={ref}
		className={cn('p-4 align-middle [&:has([role=checkbox])]:pr-0', className)}
		{...props}
	/>
))

Cell.displayName = 'TableCell'
