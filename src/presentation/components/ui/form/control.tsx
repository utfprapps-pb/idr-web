import React, { ComponentPropsWithRef } from 'react'

import { Slot } from '@radix-ui/react-slot'

import { useFormField } from './hooks/useFormField'

export const Control: React.FC<ComponentPropsWithRef<typeof Slot>> = ({
	ref,
	...props
}) => {
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
}

Control.displayName = 'FormControl'
