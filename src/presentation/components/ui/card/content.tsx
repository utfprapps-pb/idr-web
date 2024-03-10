import React from 'react'

import { cn } from '@/main/utils'

export const Content = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div ref={ref} className={cn(className)} {...props} />
))

Content.displayName = 'CardContent'
