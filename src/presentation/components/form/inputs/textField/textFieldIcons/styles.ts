import styled from 'styled-components'

import { ContainerProps } from './types'

export const Icons = styled.div<ContainerProps>`
	display: flex;
	width: max-content;
	gap: 4px;
	position: absolute;
	padding: 8px;

	${({ position }) => position}: 0;
`
