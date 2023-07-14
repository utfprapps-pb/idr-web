import styled, { css } from 'styled-components'

import { AvatarProps } from './types'

export const Avatar = styled.img<AvatarProps>`
	border-radius: ${({ type }) => (type === 'circle' ? '50%' : '0%')};

	object-fit: cover;

	transition: all 0.2s ease-in-out;

	&:hover {
		transform: scale(1.1);
	}

	${({ size }) => css`
		width: ${size}px;
		height: ${size}px;

		@media (max-width: 768px) {
			width: calc(${size}px / 1.5);
			height: calc(${size}px / 1.5);
		}

		@media (max-width: 480px) {
			width: calc(${size}px / 2);
			height: calc(${size}px / 2);
		}
	`}
`
