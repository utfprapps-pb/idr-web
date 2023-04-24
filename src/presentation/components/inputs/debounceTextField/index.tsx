import { DebounceTextFieldProps } from './types'
import { useDebounceTextField } from './useDebounceTextField'
import { TextField } from '@/presentation/components'

export type { DebounceTextFieldProps } from './types'

export const DebounceTextField: React.FC<DebounceTextFieldProps> = (props) => {
	const hookProps = useDebounceTextField(props)

	return <TextField {...hookProps} />
}
