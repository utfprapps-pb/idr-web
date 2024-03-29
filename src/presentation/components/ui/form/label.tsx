import React from 'react'

import * as LabelPrimitive from '@radix-ui/react-label'

import { cn } from '@/main/utils'

import { Label as AppLabel } from '../label'

import { useFormField } from './hooks/useFormField'

export const Label = React.forwardRef<
	React.ElementRef<typeof LabelPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
	const { formItemId } = useFormField()

	return (
		<AppLabel
			ref={ref}
			className={cn(className)}
			htmlFor={formItemId}
			{...props}
		/>
	)
})

Label.displayName = 'FormLabel'
