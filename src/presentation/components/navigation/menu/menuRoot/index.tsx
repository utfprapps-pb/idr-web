import { PropsWithChildren } from 'react'

import * as S from './styles'

export const MenuRoot: React.FC<PropsWithChildren> = ({ children }) => (
	<S.Sidebar>{children}</S.Sidebar>
)
