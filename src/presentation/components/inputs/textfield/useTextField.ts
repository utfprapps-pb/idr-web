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
		onChange
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
			if (onChange) onChange(event.target.value)
		},
		[handleCheckErrors, onChange]
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

		if (!start || !end || !warningCircle) return

		setIconsStartWidth(start.getBoundingClientRect().width)
		setIconsEndWidth(end.getBoundingClientRect().width)
		setWarningCircleWidth(warningCircle.getBoundingClientRect().width)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [!inputError])

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
