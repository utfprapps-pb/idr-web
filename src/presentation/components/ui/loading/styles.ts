import styled, { keyframes } from 'styled-components'

import { LoadingProps } from './types'

const spin = keyframes`
	to {
		transform: rotate(360deg);
	}
`

export const Loading = styled.section<LoadingProps>`
	&::before {
		content: '';
		display: block;
		width: ${({ size }) => size}px;
		height: ${({ size }) => size}px;
		animation: ${spin} 0.9s infinite linear;
		border: 5px ${({ theme }) => theme.colors.primary} solid;
		border-left-color: ${({ theme }) => theme.colors.white};
		border-radius: 100%;
	}
`
