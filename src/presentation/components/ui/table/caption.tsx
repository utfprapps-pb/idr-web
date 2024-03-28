import React from 'react'

import { cn } from '@/main/utils'

export const Caption = React.forwardRef<
	HTMLTableCaptionElement,
	React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
	<caption
		ref={ref}
		className={cn('mt-4 text-sm text-muted-foreground', className)}
		{...props}
	/>
))

Caption.displayName = 'TableCaption'
