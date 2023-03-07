import React, { useCallback, useEffect, useState } from 'react'

import { WarningCircle } from 'phosphor-react'

import * as S from './styles'
import { TextFieldProps } from './types'
import { Text } from '@/components'

export * from './types'

export const TextField: React.FC<TextFieldProps> = ({
	label,
	onChange,
	type = 'text',
	value = '',
	placeholder = '',
	icon,
	iconPosition = 'left',
	passwordIcon,
	disabled = false,
	error = '',
	touched = false,
	validationDependency,
	validator
}) => {
	const [inputError, setInputError] = useState<string | null>(error)
	const [inputTouched, setInputTouched] = useState(touched)

	const handleCheckErrors = useCallback(
		() => validator && inputTouched && setInputError(validator()),
		[inputTouched, setInputError, validator]
	)

	const handleOnChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			setInputTouched(true)
			handleCheckErrors()
			onChange(event.target.value)
		},
		[handleCheckErrors, onChange]
	)

	const handleOnBlur = useCallback(() => {
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

	return (
		<S.Container>
			<Text size="b2" color="gray">
				{label}
			</Text>

			<S.InputContainer
				iconPosition={iconPosition}
				hasPasswordIcon={!!passwordIcon}
			>
				<S.Icon className="icon">{icon}</S.Icon>
				<S.Icon className="password-icon">{passwordIcon}</S.Icon>

				<S.Input
					value={value}
					type={type}
					onChange={handleOnChange}
					onBlur={handleOnBlur}
					disabled={disabled}
					placeholder={placeholder}
					hasError={!!inputError}
					iconPosition={iconPosition}
					hasIcon={!!icon}
				/>

				{!!inputError && <WarningCircle className="error-icon" />}
			</S.InputContainer>

			{!!inputError && <S.Error>{inputError}</S.Error>}
		</S.Container>
	)
}
