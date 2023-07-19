import { useLayoutEffect, useRef, useState } from 'react'

import * as S from './styles'
import { TextFieldInputProps } from './types'
import { useTextFieldContext } from '../contexts/textFieldContext'

const MIN_PADDING = 16

export const TextFieldInput: React.FC<TextFieldInputProps> = (props) => {
	const { disabled = false, placeholder, type = 'text' } = props
	const {
		actionsContainerLeftRef,
		actionsContainerRightRef,
		value,
		error,
		handleOnBlur,
		handleOnChange
	} = useTextFieldContext()

	const iconsStartWidthRef = useRef<number>(MIN_PADDING)
	const iconsEndWidthRef = useRef<number>(MIN_PADDING)

	const [paddingLeft, setPaddingLeft] = useState<number>(
		iconsStartWidthRef.current
	)
	const [paddingRight, setPaddingRight] = useState<number>(
		iconsEndWidthRef.current
	)

	useLayoutEffect(() => {
		iconsStartWidthRef.current =
			actionsContainerLeftRef.current?.offsetWidth ?? MIN_PADDING
		iconsEndWidthRef.current =
			actionsContainerRightRef.current?.offsetWidth ?? MIN_PADDING

		setPaddingLeft(iconsStartWidthRef.current)
		setPaddingRight(iconsEndWidthRef.current)
	}, [actionsContainerLeftRef, actionsContainerRightRef])

	return (
		<S.Input
			value={value}
			type={type}
			disabled={disabled}
			placeholder={placeholder}
			hasError={!!error}
			paddingLeft={paddingLeft}
			paddingRight={paddingRight}
			onChange={handleOnChange}
			onBlur={handleOnBlur}
		/>
	)
}
