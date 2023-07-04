import { PropsWithChildren } from 'react'

import * as S from './styles'
import { MenuItemProps } from './types'

export const MenuItem: React.FC<PropsWithChildren<MenuItemProps>> = ({
	children,
	active,
	to
}) => (
	<S.MenuItem active={active} to={to}>
		{children}
	</S.MenuItem>
)
