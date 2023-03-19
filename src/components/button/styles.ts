import styled, { css } from 'styled-components'

import { ButtonThemeProps } from '@/components'
import { darken, lighten } from '@/utils'

export const Container = styled.section`
	display: flex;
	justify-content: center;
`

export const Button = styled.button<{
	buttonTheme: ButtonThemeProps
}>`
	display: flex;
	align-items: center;
	justify-content: center;

	position: relative;

	cursor: pointer;

	font-size: ${({ theme }) => theme.fontSizes.b3};
	font-family: ${({ theme }) => theme.fontFamily.primary};

	border: none;
	border-radius: 8px;

	padding: 12px 24px;

	svg {
		font-size: ${({ theme }) => theme.fontSizes.b3};
		margin-right: 8px;
	}

	${({ buttonTheme, disabled }) =>
		css`
			color: ${buttonTheme.color};
			background: ${buttonTheme.background};

			${!disabled &&
			css`
				&:hover {
					background: ${buttonTheme.backgroundHover};
				}
			`}
		`}

	${({ disabled, theme }) =>
		disabled &&
		css`
			color: ${darken({ color: theme.colors.primary, percentage: 0.8 })};
			background-color: ${lighten({
				color: theme.colors.lightgray,
				percentage: 0.25
			})};
			cursor: not-allowed;
		`}
`
