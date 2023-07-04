import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'

import { MenuItemProps } from './types'
import { lighten } from '@/main/utils'

export const MenuItem = styled(Link)<MenuItemProps>`
	all: unset;

	display: flex;
	align-items: center;
	cursor: pointer;

	border-radius: 12px;

	gap: 16px;
	margin: 16px 34px;
	padding: 16px 34px;

	transition: color 0.3s ease-in-out;

	${({ active }) =>
		active &&
		css`
			color: ${({ theme }) => theme.colors.text};
			background-color: ${({ theme }) =>
				lighten({
					color: theme.colors.primary,
					percentage: 0.2
				})};

			p {
				color: ${({ theme }) => theme.colors.text};
				font-weight: 700;
			}
		`};
`
