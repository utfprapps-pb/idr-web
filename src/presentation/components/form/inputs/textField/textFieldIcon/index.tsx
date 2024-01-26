import { ElementType } from 'react'

import { IconProps } from 'phosphor-react'
import { useTheme } from 'styled-components'

import { useTextFieldContext } from '../contexts/textFieldContext'

import * as S from './styles'

type TextFieldIconProps = {
	/**
	 * The icon to be rendered.
	 * @example
	 * ```tsx
	 * <TextFieldIcon icon={UserCircle} />
	 * ```
	 */
	icon: ElementType<IconProps>

	/**
	 * The function that be called when click on icon.
	 * @example
	 * ```tsx
	 * <TextFieldIcon icon={UserCircle} onClick={() => alert('Hello World!')} />
	 * ```
	 */
	onClick?: () => void
}

export const TextFieldIcon: React.FC<TextFieldIconProps> = ({
	icon: Icon,
	onClick
}) => {
	const { colors } = useTheme()
	const { error } = useTextFieldContext()

	return (
		<S.Container
			as={Icon}
			onClick={onClick}
			style={{
				cursor: onClick ? 'pointer' : 'default',
				color: error && colors.error
			}}
		/>
	)
}
