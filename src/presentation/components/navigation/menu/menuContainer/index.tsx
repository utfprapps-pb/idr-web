import { PropsWithChildren } from 'react'

import * as S from './styles'

export const MenuContainer: React.FC<PropsWithChildren> = ({ children }) => (
	<S.Menu>{children}</S.Menu>
)
