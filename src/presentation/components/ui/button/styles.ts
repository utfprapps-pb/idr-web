import styled, { css } from 'styled-components'

import { darken, lighten } from '@/main/utils'
import { ButtonThemeProps } from '@/presentation/components'

export const Container = styled.section`
	display: flex;
	justify-content: center;
	width: 100%;
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

	width: 100%;

	padding: 12px 24px;

	svg {
		font-size: ${({ theme }) => theme.fontSizes.b3};
		margin-right: 8px;
	}

	${({ buttonTheme, disabled }) =>
		css`
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
			color: ${darken({ color: theme.colors.primary, percentage: 0.8 })};
			background-color: ${lighten({
				color: theme.colors.lightgray,
				percentage: 0.25
			})};
			border: 1px solid
				${lighten({ color: theme.colors.lightgray, percentage: 0.25 })};
			cursor: not-allowed;
		`}
`
