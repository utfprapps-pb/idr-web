import React, { ElementType } from 'react'

import styled from 'styled-components'

type ActionsDropdownItemIconProps = {
	icon: ElementType
}

const StyledIcon = styled.div`
	font-size: ${({ theme }) => theme.fontSizes.b3};
	color: ${({ theme }) => theme.colors.black};
`

export const ActionsDropdownItemIcon: React.FC<
	ActionsDropdownItemIconProps
> = ({ icon: Icon }) => <StyledIcon as={Icon} />
