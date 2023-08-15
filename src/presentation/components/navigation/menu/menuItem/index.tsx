import { PropsWithChildren } from 'react'

import * as S from './styles'
import { MenuItemProps } from './types'

export const MenuItem: React.FC<PropsWithChildren<MenuItemProps>> = ({
	children,
	active,
	to
}) => (
	// Fazer parse para String para evitar erro no console do navegador
	<S.MenuItem active={String(active)} to={to}>
		{children}
	</S.MenuItem>
)
