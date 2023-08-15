import styled, { css } from 'styled-components'

import { ButtonThemeProps } from '../theme'

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

	width: 100%;

	padding: 12px 24px;

	${({ buttonTheme, disabled }) => css`
		color: ${buttonTheme.color};
		background: ${buttonTheme.background};
		border: ${buttonTheme.border};

		${!disabled &&
		css`
			&:hover {
				background: ${buttonTheme.backgroundHover};
			}
		`};
	`}

	${({ disabled, theme }) =>
		disabled &&
		css`
			color: ${theme.colors.disabled.text};
			background-color: ${theme.colors.disabled.background};
			border: 1px solid ${theme.colors.disabled.border};
			cursor: not-allowed;
		`}
`
