import { useFormContext } from 'react-hook-form'

import { useFormFieldContext, useFormItemContext } from '../contexts'

export const useFormField = () => {
	const fieldHook = useFormFieldContext()

	if (!fieldHook) {
		throw new Error('useFormField should be used within <FormField>')
	}

	const itemHook = useFormItemContext()
	const { getFieldState, formState } = useFormContext()

	const fieldState = getFieldState(fieldHook.name, formState)
	const { id } = itemHook

	return {
		id,
		name: fieldHook.name,
		formItemId: `${id}-form-item`,
		formDescriptionId: `${id}-form-item-description`,
		formMessageId: `${id}-form-item-message`,
		...fieldState,
	}
}
