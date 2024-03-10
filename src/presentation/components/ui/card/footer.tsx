import React from 'react'

import { cn } from '@/main/utils'

export const Footer = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div ref={ref} className={cn('flex items-center', className)} {...props} />
))

Footer.displayName = 'CardFooter'
