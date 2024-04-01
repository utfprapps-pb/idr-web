import * as React from 'react'

import { cn } from '@/main/utils'

export const Root = ({ className, ...props }: React.ComponentProps<'nav'>) => (
	<nav
		role="navigation"
		aria-label="pagination"
		className={cn('mx-auto flex w-full justify-center', className)}
		{...props}
	/>
)

Root.displayName = 'PaginationRoot'
