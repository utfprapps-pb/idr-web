import { useCallback, useEffect, useRef, useState } from 'react'

import { TextFieldProps } from './types'

type UseTextFieldProps = Partial<TextFieldProps>

export const useTextField = (props: UseTextFieldProps) => {
	const {
		error = '',
		touched = false,
		value,
		validationDependency,
		validator,
		onChange,
		mask
	} = props

	const [inputError, setInputError] = useState<string>(error || '')
	const [inputTouched, setInputTouched] = useState(touched)
	const [iconsStartWidth, setIconsStartWidth] = useState(0)
	const [iconsEndWidth, setIconsEndWidth] = useState(0)
	const [warningCircleWidth, setWarningCircleWidth] = useState(0)

	const iconsStartRef = useRef<HTMLDivElement>(null)
	const iconsEndRef = useRef<HTMLDivElement>(null)
	const warningCircleRef = useRef<SVGSVGElement>(null)

	const handleCheckErrors = useCallback(
		() => validator && inputTouched && setInputError(validator()),
		[inputTouched, setInputError, validator]
	)

	const handleOnChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			setInputTouched(true)
			handleCheckErrors()
			const maskedValue = mask ? mask(event.target.value) : event.target.value
			if (onChange) onChange(maskedValue)
		},
		[handleCheckErrors, mask, onChange]
	)

	const handleOnBlur = useCallback(() => {
		setInputTouched(true)
		handleCheckErrors()
	}, [handleCheckErrors])

	useEffect(() => {
		handleCheckErrors()
	}, [value, validationDependency, handleCheckErrors])

	useEffect(() => {
		if (touched !== undefined && inputTouched !== touched)
			setInputTouched(touched)
	}, [touched, inputTouched])

	useEffect(() => {
		if (inputTouched) handleCheckErrors()
	}, [handleCheckErrors, inputTouched])

	useEffect(() => {
		const start = iconsStartRef.current
		const end = iconsEndRef.current
		const warningCircle = warningCircleRef.current

		setIconsStartWidth(start?.getBoundingClientRect().width || 0)
		setIconsEndWidth(end?.getBoundingClientRect().width || 0)
		setWarningCircleWidth(warningCircle?.getBoundingClientRect().width || 0)
	}, [inputError])

	return {
		inputError,
		iconsStartWidth,
		iconsEndWidth,
		warningCircleWidth,
		iconsStartRef,
		iconsEndRef,
		warningCircleRef,
		handleOnBlur,
		handleOnChange
	}
}
