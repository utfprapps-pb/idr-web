import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'

import { MenuItemStyledProps } from './types'

export const MenuItem = styled(Link)<MenuItemStyledProps>`
	all: unset;

	display: flex;
	align-items: center;
	cursor: pointer;

	gap: 16px;
	margin: 16px 34px;
	padding: 16px 34px;

	transition: color 0.3s ease-in-out;

	${({ active }) =>
		active === 'true' &&
		css`
			border-right: 8px solid ${({ theme }) => theme.colors.primary};

			p {
				color: ${({ theme }) => theme.colors.darkgray};
				font-weight: 700;
			}
		`};
`
