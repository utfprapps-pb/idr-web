import { ElementType } from 'react'

import { IconProps } from 'phosphor-react'

import { TextFieldProps } from '../textField'

export type PasswordInputProps = TextFieldProps & {
	/**
	 * Label of the input.
	 *
	 * @example
	 * ```tsx
	 * <PasswordInput label="Password" />
	 * ```
	 */
	label: string

	/**
	 * Placeholder of the input.
	 *
	 * @example
	 * ```tsx
	 * <PasswordInput placeholder="Password" />
	 * ```
	 */
	placeholder?: string

	/**
	 * Disabled condition of the input.
	 *
	 * @example
	 * ```tsx
	 * <PasswordInput disabled={false} />
	 * ```
	 */
	disabled?: boolean

	/**
	 * Icons to be rendered at the start of the input.
	 *
	 * @example
	 * ```tsx
	 * <PasswordInput iconsStart={[{key: 'eyeIcon', icon: Eye}]} />
	 * ```
	 */
	iconsStart?: {
		key: string
		icon: ElementType<IconProps>
	}[]

	/**
	 * Icons to be rendered at the end of the input.
	 *
	 * @example
	 * ```tsx
	 * <PasswordInput iconsEnd={[{key: 'eyeIcon', icon: Eye}]} />
	 * ```
	 */
	iconsEnd?: {
		key: string
		icon: ElementType<IconProps>
	}[]
}
