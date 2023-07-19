import styled, { css } from 'styled-components'

import { InputProps } from './types'

export const Input = styled.input<InputProps>`
	background-color: ${({ theme }) => theme.colors.white};
	border: 1px solid
		${({ hasError, theme }) =>
			hasError ? theme.colors.error : theme.colors.darkgray};
	border-radius: 4px;
	box-sizing: border-box;

	color: ${({ theme }) => theme.colors.text};

	font-size: ${({ theme }) => theme.fontSizes.b3};
	font-weight: ${({ theme }) => theme.fontWeights.regular};
	font-family: ${({ theme }) => theme.fontFamily.primary};

	height: 44px;
	width: 100%;

	outline: none;

	${({ paddingLeft, paddingRight }) => css`
		padding: 0 ${paddingRight}px 0 ${paddingLeft}px;
	`}

	${({ hasError, theme }) =>
		!hasError &&
		css`
			:active,
			:focus {
				border: 2px solid ${theme.colors.primary};
				box-shadow: inset 0px 4px 5px rgba(33, 1, 38, 0.03);
			}
		`}

	:disabled {
		${({ theme }) => css`
			background-color: ${theme.colors.disabled.background};
			border: 1px solid ${theme.colors.disabled.border};
		`}
	}

	::placeholder {
		${({ theme }) => css`
			color: ${theme.colors.gray};
			font-size: ${theme.fontSizes.b3};
			font-weight: ${theme.fontWeights.light};
			font-family: ${theme.fontFamily.primary};
		`}
	}
`
