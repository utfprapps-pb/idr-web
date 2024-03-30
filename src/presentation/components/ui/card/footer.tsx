import { HTMLAttributes, forwardRef } from 'react'

import { cn } from '@/main/utils'

export const Footer = forwardRef<
	HTMLDivElement,
	HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div ref={ref} className={cn('flex items-center', className)} {...props} />
))

Footer.displayName = 'CardFooter'
