import { ActionsDropdownItem } from './actionsDropdownItem'
import { ActionsDropdownItemContainer } from './actionsDropdownItemContainer'
import {
	ActionsDropdownItemIcon,
	ActionsDropdownItemIconProps
} from './actionsDropdownItemIcon'
import { ActionsDropdownRoot } from './actionsDropdownRoot'

export const ActionsDropdown = {
	Root: ActionsDropdownRoot,
	Item: ActionsDropdownItemContainer,
	Text: ActionsDropdownItem,
	Icon: ActionsDropdownItemIcon
}

type Item = {
	text: string
	icon: ActionsDropdownItemIconProps['icon']
	onClick: () => void
}

export type ActionsDropdownProps = {
	Item: Item
}
