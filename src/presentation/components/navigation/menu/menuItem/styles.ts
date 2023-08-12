import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'

import { MenuItemStyledProps } from './types'
import { lighten } from '@/main/utils'

export const MenuItem = styled(Link)<MenuItemStyledProps>`
	all: unset;

	display: flex;
	align-items: center;
	cursor: pointer;

	gap: 16px;
	padding: 24px 48px;

	transition: color 0.3s ease-in-out;

	${({ active }) =>
		active === 'true' &&
		css`
			border-right: 8px solid ${({ theme }) => theme.colors.primary};
			background-color: ${({ theme }) =>
				lighten({
					color: theme.colors.primary,
					percentage: 0.55
				})};

			p {
				color: ${({ theme }) => theme.colors.darkgray};
				font-weight: 700;
			}
		`};
`
