import { HTMLAttributes, forwardRef } from 'react'

import { cn } from '@/main/utils'

export const Content = forwardRef<
	HTMLDivElement,
	HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div ref={ref} className={cn(className)} {...props} />
))

Content.displayName = 'CardContent'
