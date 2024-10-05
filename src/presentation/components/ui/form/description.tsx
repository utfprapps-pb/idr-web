import { forwardRef, HTMLAttributes } from 'react'

import { cn } from '@/shared/utils'

import { useFormField } from './hooks/useFormField'

export const Description = forwardRef<
	HTMLParagraphElement,
	HTMLAttributes<HTMLParagraphElement>
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
