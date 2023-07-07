import styled, { css } from 'styled-components'

import { InputProps } from './types'
import { TextFieldIcons } from '../textFieldIcons'
import { darken, lighten } from '@/main/utils'

export const ContainerActions = styled(TextFieldIcons)`
	padding: 0 8px;
	right: 0;
`

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
		padding: 0 ${paddingRight || 16}px 0 ${paddingLeft || 16}px;
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
			background-color: ${lighten({
				color: theme.colors.gray,
				percentage: 0.2
			})};
			border: 1px solid
				${darken({ color: theme.colors.primary, percentage: 0.3 })};
		`}
	}

	::placeholder {
		${({ theme }) => css`
			color: ${lighten({ color: theme.colors.gray, percentage: 0.4 })};
			font-size: ${theme.fontSizes.b3};
			font-weight: ${theme.fontWeights.light};
			font-family: ${theme.fontFamily.primary};
		`}
	}
`
