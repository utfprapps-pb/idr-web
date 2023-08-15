import { LinkProps } from 'react-router-dom'

export type MenuItemProps = LinkProps & {
	/**
	 * The active state of the menu item
	 * @example
	 * ```tsx
	 * <MenuItem active />
	 * ```
	 */
	active: boolean
}

export type MenuItemStyledProps = {
	active: string
}
