import React, { PropsWithChildren } from 'react'

import * as S from './styles'

export const HeaderRoot: React.FC<PropsWithChildren> = ({ children }) => (
	<S.Header>{children}</S.Header>
)
