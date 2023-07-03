import { PropsWithChildren } from 'react'

import { WarningCircle } from 'phosphor-react'
import { useTheme } from 'styled-components'

import * as S from './styles'
import { Props } from './types'
import { useTextFieldContext } from '../contexts/textFieldContext'
import { TextFieldIcon } from '../textFieldIcon'

export const TextFieldIcons: React.FC<PropsWithChildren<Props>> = ({
	children,
	position = 'left',
	isWithError = false
}) => {
	const { colors } = useTheme()
	const { actionsContainerLeftRef, actionsContainerRightRef, error } =
		useTextFieldContext()

	return (
		<S.Icons
			ref={
				position === 'left' ? actionsContainerLeftRef : actionsContainerRightRef
			}
			hasError={!!error}
			position={position}
		>
			{children}
			{error && isWithError && (
				<TextFieldIcon icon={<WarningCircle color={colors.error} />} />
			)}
		</S.Icons>
	)
}
