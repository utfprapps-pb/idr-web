import styled from 'styled-components'

import { darken } from '@/main/utils/colors'

export const Logo = styled.div`
	display: grid;
	place-items: center;

	color: ${({ theme }) =>
		darken({
			color: theme.colors.primary,
			percentage: 0.2
		})};

	height: 120px;

	font-weight: 600;
	font-family: ${({ theme }) => theme.fontFamily.logo};
	font-size: ${({ theme }) => theme.fontSizes.b1};
`
