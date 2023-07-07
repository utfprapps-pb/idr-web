import { forwardRef, useMemo } from 'react'

import * as S from './styles'
import { ButtonProps } from './types'
import { buttonThemes } from '../theme'

export const ButtonContainer = forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			children,
			disabled = false,
			theme = 'primary',
			type = 'button',
			onClick = () => null,
			...props
		},
		ref
	) => {
		const buttonTheme = useMemo(() => buttonThemes[theme], [theme])

		return (
			<S.Button
				buttonTheme={buttonTheme}
				ref={ref}
				type={type}
				disabled={disabled}
				onClick={onClick}
				{...props}
			>
				{children}
			</S.Button>
		)
	}
)
