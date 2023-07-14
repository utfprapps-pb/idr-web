import { ElementType } from 'react'

import { IconProps } from 'phosphor-react'

export type MenuItemIconProps = {
	icon: ElementType<IconProps>
}

export const MenuItemIcon: React.FC<MenuItemIconProps> = ({ icon: Icon }) => (
	<Icon size={32} />
)
