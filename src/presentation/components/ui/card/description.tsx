import { HTMLAttributes, forwardRef } from 'react'

import { cn } from '@/main/utils'

export const Description = forwardRef<
	HTMLParagraphElement,
	HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
	<p
		ref={ref}
		className={cn('text-sm text-muted-foreground', className)}
		{...props}
	/>
))

Description.displayName = 'CardDescription'
