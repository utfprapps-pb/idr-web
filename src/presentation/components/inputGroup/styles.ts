import styled from 'styled-components'

import { ContainerProps } from './types'

export const Container = styled.div<ContainerProps>`
	display: grid;
	grid-template-columns: repeat(${({ childrenLength }) => childrenLength}, 1fr);
	grid-gap: 16px;
	width: 100%;

	${({ theme }) => theme.media.forPhoneOnly()} {
		grid-template-columns: 1fr;
	}
`
