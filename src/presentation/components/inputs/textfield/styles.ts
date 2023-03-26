import styled, { css } from 'styled-components'

import { darken, lighten } from '@/main/utils'

const ICONS_START_POSITION = 12
const ICONS_END_POSITION = 18

export const Container = styled.section`
	display: flex;
	flex-direction: column;

	width: 100%;
	gap: 4px;
`

export const InputContainer = styled.div`
	display: flex;
	align-items: center;

	position: relative;
`

type InputProps = {
	hasError: boolean
	paddingLeft: number
	paddingRight: number
}

export const Input = styled.input<InputProps>`
	background-color: ${({ theme }) => theme.colors.white};
	border: 1px solid
		${({ hasError, theme }) =>
			hasError ? theme.colors.error : theme.colors.darkgray};
	border-radius: 4px;
	box-sizing: border-box;

	color: ${({ theme }) => theme.colors.gray};

	font-size: ${({ theme }) => theme.fontSizes.b3};
	font-weight: ${({ theme }) => theme.fontWeights.regular};
	font-family: ${({ theme }) => theme.fontFamily.primary};

	height: 44px;
	width: 100%;
	padding: 16px;
	${({ paddingLeft, paddingRight }) => css`
		padding-left: calc(${paddingLeft}px + ${ICONS_START_POSITION}px + 4px);
		padding-right: calc(${paddingRight}px + ${ICONS_END_POSITION}px + 4px);
	`}

	outline: none;

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
			color: ${darken({ color: theme.colors.primary, percentage: 0.8 })};
			background-color: ${lighten({
				color: theme.colors.lightgray,
				percentage: 0.32
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

export const Error = styled.span`
	${({ theme: { colors, fontFamily, fontSizes } }) => css`
		color: ${colors.error};

		font-family: ${fontFamily.primary};
		font-size: ${fontSizes.b4};
	`}

	text-align: end;
	font-weight: 400;
`

const commonIconsContainer = css`
	display: flex;
	width: max-content;
	gap: 4px;
	position: absolute;
`

export const IconsStart = styled.div`
	${commonIconsContainer}

	left: ${ICONS_START_POSITION}px;
`

export const IconsEnd = styled.div`
	${commonIconsContainer}

	right: ${ICONS_END_POSITION}px;
`

export const Icon = styled.i<{ isClickable: boolean }>`
	display: flex;
	align-items: center;
	justify-content: center;

	${({ isClickable }) => css`
		cursor: ${isClickable ? 'pointer' : 'default'};
	`}
`
