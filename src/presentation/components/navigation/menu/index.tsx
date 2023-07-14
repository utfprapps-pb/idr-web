import { MenuContainer } from './menuContainer'
import { MenuItem } from './menuItem'
import { MenuItemIcon, MenuItemIconProps } from './menuItemIcon'
import { MenuItemText } from './menuItemText'
import { MenuLogo } from './menuLogo'
import { MenuRoot } from './menuRoot'

export const Menu = {
	Root: MenuRoot,
	Container: MenuContainer,
	Logo: MenuLogo,
	Item: MenuItem,
	ItemIcon: MenuItemIcon,
	ItemText: MenuItemText
}

type Item = {
	text: string
	to: string
	icon: MenuItemIconProps['icon']
}

export type MenuProps = {
	Item: Item
}
