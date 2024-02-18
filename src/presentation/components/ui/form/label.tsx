import React, { ComponentPropsWithRef } from 'react'

import * as LabelPrimitive from '@radix-ui/react-label'

import { cn } from '@/main/utils'
import { Label as AppLabel } from '@/presentation/components/ui'

import { useFormField } from './hooks/useFormField'

export const Label: React.FC<
	ComponentPropsWithRef<typeof LabelPrimitive.Root>
> = ({ className, ref, ...props }) => {
	const { error, formItemId } = useFormField()

	return (
		<AppLabel
			ref={ref}
			className={cn(error && 'text-destructive', className)}
			htmlFor={formItemId}
			{...props}
		/>
	)
}

Label.displayName = 'FormLabel'
