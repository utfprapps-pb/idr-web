import React, {
	Fragment,
	useCallback,
	useEffect,
	useRef,
	useState
} from 'react'

import { faker } from '@faker-js/faker/locale/en'
import { WarningCircle } from 'phosphor-react'

import * as S from './styles'
import { TextFieldProps } from './types'
import { Text } from '@/presentation/components'
import { theme } from '@/styles'

export * from './types'

export const TextField: React.FC<TextFieldProps> = ({
	label,
	value,
	onChange,
	type = 'text',
	placeholder,
	disabled = false,
	error = '',
	iconsStart = [],
	iconsEnd = [],
	touched = false,
	validationDependency,
	validator
}) => {
	const [inputError, setInputError] = useState<string | null>(error)
	const [inputTouched, setInputTouched] = useState(touched)
	const [iconsStartWidth, setIconsStartWidth] = useState(0)
	const [iconsEndWidth, setIconsEndWidth] = useState(0)

	const iconsStartRef = useRef<HTMLDivElement>(null)
	const iconsEndRef = useRef<HTMLDivElement>(null)

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

	useEffect(() => {
		const start = iconsStartRef.current
		const end = iconsEndRef.current

		if (!start || !end) return

		setIconsStartWidth(start.getBoundingClientRect().width)
		setIconsEndWidth(end.getBoundingClientRect().width)
	}, [])

	return (
		<S.Container>
			<Text size="b3" color="gray">
				{label}
			</Text>

			<S.InputContainer>
				<S.IconsStart ref={iconsStartRef}>
					{iconsStart.map((icon) => {
						const isClickable = !!icon?.props?.onClick

						return (
							<Fragment key={faker.datatype.uuid()}>
								<S.Icon isClickable={isClickable}>{icon}</S.Icon>
							</Fragment>
						)
					})}
				</S.IconsStart>

				<S.Input
					value={value}
					type={type}
					onChange={handleOnChange}
					onBlur={handleOnBlur}
					disabled={disabled}
					placeholder={placeholder}
					hasError={!!inputError}
					paddingLeft={iconsStartWidth}
					paddingRight={iconsEndWidth}
				/>

				<S.IconsEnd ref={iconsEndRef}>
					{iconsEnd.map((icon) => {
						const isClickable = !!icon?.props?.onClick

						return (
							<Fragment key={faker.datatype.uuid()}>
								<S.Icon isClickable={isClickable}>{icon}</S.Icon>
							</Fragment>
						)
					})}
					{inputError && <WarningCircle color={theme.colors.error} />}
				</S.IconsEnd>
			</S.InputContainer>

			{!!inputError && <S.Error>{inputError}</S.Error>}
		</S.Container>
	)
}
