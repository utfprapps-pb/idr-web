import React, { PropsWithChildren } from 'react'

import * as S from './styles'

export const ButtonRoot: React.FC<PropsWithChildren> = ({ children }) => (
	<S.Container>{children}</S.Container>
)
