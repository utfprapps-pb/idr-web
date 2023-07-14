import { ElementType } from 'react'

import styled from 'styled-components'

type ButtonIconProps = {
	icon: ElementType
}

const StyledIcon = styled.div`
	font-size: ${({ theme }) => theme.fontSizes.b2};
	margin: 0 4px;
`

export const ButtonIcon: React.FC<ButtonIconProps> = ({ icon: Icon }) => (
	<StyledIcon as={Icon} />
)
