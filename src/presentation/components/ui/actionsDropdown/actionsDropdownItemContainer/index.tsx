import React from 'react'

import * as S from './styles'
import { ActionsDropdownItemContainerProps } from './types'

export const ActionsDropdownItemContainer: React.FC<
	ActionsDropdownItemContainerProps
> = ({ children, onClick }) => (
	<S.Container onClick={onClick}>{children}</S.Container>
)
