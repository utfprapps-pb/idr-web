import React, { PropsWithChildren } from 'react'

import * as S from './styles'

export const ActionsDropdownRoot: React.FC<PropsWithChildren> = ({
	children
}) => <S.Container>{children}</S.Container>
