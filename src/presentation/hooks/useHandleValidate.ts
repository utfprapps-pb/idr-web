import { useCallback, useMemo } from 'react'

import { ValidationComposite } from '@/main/composite'

type UseHandleValidateProps<FD extends object> = {
	formData: FD
	validation: ValidationComposite
}

export const useHandleValidate = <K extends string, FD extends object>({
	formData,
	validation
}: UseHandleValidateProps<FD>) => {
	const handleValidate = useCallback(
		(field: K) => (): string => {
			const valid =
				validation.validate({
					fieldName: field,
					input: formData
				}) || ''

			return valid
		},
		[formData, validation]
	)

	const formIsValid = useMemo(
		() =>
			Object.keys(formData).every(
				(key) =>
					!validation.validate({
						input: formData,
						fieldName: key
					})
			),
		[formData, validation]
	)

	return {
		formIsValid,
		handleValidate
	}
}
