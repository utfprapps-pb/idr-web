import { DebounceTextFieldProps } from './types'
import { useDebounceTextField } from './useDebounceTextField'
import { TextField } from '../textfield'

export type { DebounceTextFieldProps } from './types'

export const DebounceTextField: React.FC<DebounceTextFieldProps> = (props) => {
	const hookProps = useDebounceTextField(props)
	const { handleOnChange } = hookProps

	return <TextField {...hookProps} onChange={handleOnChange} />
}
