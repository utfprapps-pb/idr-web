import { PropsWithChildren } from 'react'

import * as S from './styles'

export const MenuLogo: React.FC<PropsWithChildren> = ({ children }) => (
	<S.Logo>{children}</S.Logo>
)
