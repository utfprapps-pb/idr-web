import { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react'

import { Slot } from '@radix-ui/react-slot'

import { useFormField } from './hooks/useFormField'

export const Control = forwardRef<
	ElementRef<typeof Slot>,
	ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
	const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

	return (
		<Slot
			ref={ref}
			id={formItemId}
			aria-describedby={
				!error
					? `${formDescriptionId}`
					: `${formDescriptionId} ${formMessageId}`
			}
			aria-invalid={!!error}
			{...props}
		/>
	)
})

Control.displayName = 'FormControl'
