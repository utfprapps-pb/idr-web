import * as S from './styles'
import { TextFieldInputProps } from './types'
import { useTextFieldContext } from '../contexts/textFieldContext'

export const TextFieldInput: React.FC<TextFieldInputProps> = (props) => {
	const {
		actionsContainerLeftRef,
		actionsContainerRightRef,
		value,
		error,
		handleOnBlur,
		handleOnChange
	} = useTextFieldContext()
	const { disabled = false, placeholder, type = 'text' } = props

	const paddingLeft = actionsContainerLeftRef?.current?.offsetWidth ?? 0
	const paddingRight = actionsContainerRightRef?.current?.offsetWidth ?? 0

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
