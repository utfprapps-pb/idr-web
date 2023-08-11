import { PropsWithChildren } from 'react'

export type ActionsDropdownItemContainerProps = PropsWithChildren<{
	/**
	 * The function to be called when the item is clicked
	 * @example
	 * ```tsx
	 * const doSomething = () => {
	 * 	...
	 * }
	 *
	 * <ActionsDropdownItemContainer onClick={doSomething} />
	 * ```
	 */
	onClick: () => void
}>
