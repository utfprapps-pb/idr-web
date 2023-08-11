import { MutableRefObject, PropsWithChildren } from 'react'

import { ButtonThemes } from '../theme'

export type ButtonProps = PropsWithChildren<{
	/**
	 * The disable condition of the button
	 * @example
	 * ```tsx
	 * <Button disabled />
	 * ```
	 * @default false
	 */
	disabled?: boolean

	/**
	 * The reference of the Button element
	 * @example
	 * ```tsx
	 * import { useRef } from 'react'
	 *
	 * const myRef = useRef<HTMLButtonElement>(null)
	 *
	 * <Button ref={myRef} />
	 * ```
	 */
	ref?: MutableRefObject<null>

	/**
	 * The theme of the button
	 * @example
	 * ```tsx
	 * <Button theme='primary' />
	 * ```
	 * @default 'primary'
	 */
	theme?: ButtonThemes

	/**
	 * The type of the button
	 * @example
	 * ```tsx
	 * <Button type='button' />
	 * ```
	 * @default 'button'
	 */
	type?: 'submit' | 'button'

	/**
	 * The onClick function of the button
	 * @example
	 * ```tsx
	 * const doSomething = () => {
	 * 	...
	 * }
	 *
	 * <Button onClick={doSomething} />
	 * ```
	 */
	onClick?: () => void
}>
