import React from 'react'

import { cn } from '@/main/utils'

export const Header = React.forwardRef<
	HTMLTableSectionElement,
	React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
	<thead ref={ref} className={cn('[&_tr]:border-b', className)} {...props} />
))

Header.displayName = 'TableHeader'
