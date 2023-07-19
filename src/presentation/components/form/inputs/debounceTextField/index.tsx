import { XCircle } from 'phosphor-react'

import { DebounceTextFieldProps } from './types'
import { useDebounceTextField } from './useDebounceTextField'
import { TextField } from '../textField'

export * from './types'

export const DebounceTextField: React.FC<DebounceTextFieldProps> = (props) => {
	const { label, placeholder, disabled } = props

	const hookProps = useDebounceTextField(props)

	return (
		<TextField.Root {...hookProps}>
			<TextField.Label label={label} />
			<TextField.InputContainer>
				<TextField.Icons position="right" isWithError>
					<TextField.Icon icon={XCircle} onClick={hookProps.handleOnClear} />
				</TextField.Icons>
				<TextField.Input disabled={disabled} placeholder={placeholder} />
			</TextField.InputContainer>
			<TextField.Error />
		</TextField.Root>
	)
}
