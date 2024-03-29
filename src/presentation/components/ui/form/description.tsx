import React from 'react'

import { cn } from '@/main/utils'

import { useFormField } from './hooks/useFormField'

export const Description = React.forwardRef<
	HTMLParagraphElement,
	React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
	const { formDescriptionId } = useFormField()

	return (
		<p
			ref={ref}
			id={formDescriptionId}
			className={cn('text-sm text-muted-foreground', className)}
			{...props}
		/>
	)
})

Description.displayName = 'FormDescription'
