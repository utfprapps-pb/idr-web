import React, { Fragment } from 'react'

import { faker } from '@faker-js/faker/locale/en'
import { WarningCircle } from 'phosphor-react'

import * as S from './styles'
import { TextFieldProps } from './types'
import { useTextField } from './useTextField'
import { Text } from '@/presentation/components'
import { theme } from '@/styles'

export * from './types'

export const TextField: React.FC<TextFieldProps> = (props) => {
	const {
		label,
		value,
		type = 'text',
		placeholder,
		disabled = false,
		iconsStart = [],
		iconsEnd = []
	} = props

	const {
		iconsStartWidth,
		iconsEndWidth,
		warningCircleWidth,
		iconsStartRef,
		iconsEndRef,
		warningCircleRef,
		inputError,
		handleOnBlur,
		handleOnChange
	} = useTextField(props)

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
					paddingRight={iconsEndWidth + warningCircleWidth}
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
					{inputError && (
						<WarningCircle ref={warningCircleRef} color={theme.colors.error} />
					)}
				</S.IconsEnd>
			</S.InputContainer>

			{!!inputError && <S.Error>{inputError}</S.Error>}
		</S.Container>
	)
}
