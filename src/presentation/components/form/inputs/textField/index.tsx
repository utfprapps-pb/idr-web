import {
	TextFieldProvider,
	TextFieldProviderProps
} from './contexts/textFieldContext'
import { TextFieldError } from './textFieldError'
import { TextFieldIcon } from './textFieldIcon'
import { TextFieldIcons } from './textFieldIcons'
import { TextFieldInput } from './textFieldInput'
import { TextFieldInputContainer } from './textFieldInputContainer'
import { TextFieldLabel } from './textFieldLabel'

export type TextFieldProps = TextFieldProviderProps

export const TextField = {
	Root: TextFieldProvider,
	Error: TextFieldError,
	Label: TextFieldLabel,
	Input: TextFieldInput,
	Icons: TextFieldIcons,
	Icon: TextFieldIcon,
	InputContainer: TextFieldInputContainer
}
