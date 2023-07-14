import React, { PropsWithChildren } from 'react'

import * as S from './styles'

export const TextFieldRoot: React.FC<PropsWithChildren> = ({ children }) => (
	<S.Container>{children}</S.Container>
)
