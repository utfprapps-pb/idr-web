import { ElementType } from 'react'

import { IconProps } from 'phosphor-react'
import styled from 'styled-components'

export type ActionsDropdownItemIconProps = {
	icon: ElementType<IconProps>
}

const StyledIcon = styled.div`
	font-size: ${({ theme }) => theme.fontSizes.b3};
	color: ${({ theme }) => theme.colors.black};
`

export const ActionsDropdownItemIcon: React.FC<
	ActionsDropdownItemIconProps
> = ({ icon: Icon }) => <StyledIcon as={Icon} />
