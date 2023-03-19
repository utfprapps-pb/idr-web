import { ButtonThemes } from '@/components'

export type ButtonProps = {
	/**
	 * The button content
	 *
	 * @example
	 * ```tsx
	 * <Button>
	 * 	<p>children</p>
	 * </Button>
	 * ```
	 */
	children: React.ReactNode

	/**
	 * The disable condition of the button
	 *
	 * @example
	 * ```tsx
	 * <Button disabled />
	 * ```
	 * @default false
	 */
	disabled?: boolean

	/**
	 * The reference of the Button element
	 *
	 * @example
	 * ```tsx
	 * import { useRef } from 'react'
	 *
	 * const myRef = useRef<HTMLButtonElement>(null)
	 *
	 * <Button ref={myRef} />
	 * ```
	 */
	ref?: React.MutableRefObject<null>

	/**
	 * The theme of the button
	 *
	 * @example
	 * ```tsx
	 * <Button theme='primary' />
	 * ```
	 * @default 'primary'
	 */
	theme?: keyof typeof ButtonThemes

	/**
	 * The type of the button
	 *
	 * @example
	 * ```tsx
	 * <Button type='button' />
	 * ```
	 * @default 'button'
	 */
	type?: 'submit' | 'button'

	/**
	 * The icon of the button
	 *
	 * @example
	 * ```tsx
	 * <Button icon={<Eye />} />
	 * ```
	 */
	icon?: React.ReactNode

	/**
	 * The onClick function of the button
	 *
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
}
