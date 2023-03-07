import styled, { css } from 'styled-components'

import { darken, lighten } from '@/utils'

export const Container = styled.section`
	display: flex;
	flex-direction: column;

	gap: 4px;
`

type InputContainerProps = {
	iconPosition: 'left' | 'right'
	hasPasswordIcon: boolean
}

export const InputContainer = styled.div<InputContainerProps>`
	display: flex;
	align-items: center;

	position: relative;

	.icon {
		position: absolute;
		${({ iconPosition, hasPasswordIcon }) => css`
			${iconPosition}: ${hasPasswordIcon && iconPosition === 'right'
				? '28px;'
				: '16px;'};
		`}
	}

	.error-icon {
		color: ${({ theme }) => theme.colors.error};
		position: absolute;
		right: ${({ iconPosition, hasPasswordIcon }) => {
			if (iconPosition === 'right') {
				return hasPasswordIcon ? '64px;' : '40px;'
			}

			return hasPasswordIcon ? '40px;' : '16px;'
		}};
	}

	.password-icon {
		position: absolute;
		right: '16px;';
	}
`

export const Icon = styled.i`
	display: flex;
	align-items: center;
`

type InputProps = {
	hasError: boolean
	hasIcon: boolean
	iconPosition: 'left' | 'right'
}

export const Input = styled.input<InputProps>`
	background-color: ${({ theme }) => theme.colors.white};
	border: 1px solid
		${({ hasError, theme }) =>
			hasError ? theme.colors.error : darken({ color: theme.colors.primary })};
	border-radius: 4px;
	box-sizing: border-box;

	color: ${({ theme }) => theme.colors.gray};

	font-size: ${({ theme }) => theme.fontSizes.b3};
	font-weight: 400;
	font-family: ${({ theme }) => theme.fontFamily.primary};

	height: 44px;
	width: 100%;
	padding: 16px;

	outline: none;

	${({ iconPosition, hasIcon }) => hasIcon && `padding-${iconPosition}: 40px;`}

	${({ hasError, theme }) =>
		!hasError &&
		css`
			:active,
			:focus {
				border: 1px solid
					${darken({ color: theme.colors.primary, percentage: 0.2 })};
				box-shadow: inset 0px 4px 5px rgba(33, 1, 38, 0.03);
			}
		`}

	:disabled {
		${({ theme }) => css`
			color: ${darken({ color: theme.colors.primary, percentage: 0.8 })};
			background-color: ${lighten({
				color: theme.colors.lightgray,
				percentage: 0.3
			})};
			border: 1px solid
				${darken({ color: theme.colors.primary, percentage: 0.3 })};
		`}
	}

	::placeholder {
		${({ theme }) => css`
			color: ${darken({ color: theme.colors.primary })};
			font-size: ${theme.fontSizes.b4};
			font-weight: 400;
			font-family: ${theme.fontFamily.primary};
		`}
`

export const Error = styled.span`
	${({ theme: { colors, fontFamily, fontSizes } }) => css`
		color: ${colors.error};

		font-family: ${fontFamily.primary};
		font-size: ${fontSizes.b4};
	`}

	text-align: end;
	font-weight: 400;
`
