import React, { useMemo } from 'react'

import * as S from './styles'
import { buttonThemes } from './theme'
import { ButtonProps } from './types'

export * from './types'
export * from './theme'

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			children,
			disabled = false,
			theme = 'primary',
			type = 'button',
			icon,
			onClick = () => null,
			...props
		},
		ref
	) => {
		const buttonTheme = useMemo(() => buttonThemes[theme], [theme])

		return (
			<S.Container>
				<S.Button
					buttonTheme={buttonTheme}
					ref={ref}
					type={type}
					disabled={disabled}
					onClick={onClick}
					{...props}
				>
					{icon}
					{children}
				</S.Button>
			</S.Container>
		)
	}
)
