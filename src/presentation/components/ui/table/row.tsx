import React from 'react'

import { cn } from '@/main/utils'

export const Row = React.forwardRef<
	HTMLTableRowElement,
	React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
	<tr
		ref={ref}
		className={cn(
			'border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted',
			className
		)}
		{...props}
	/>
))

Row.displayName = 'TableRow'
