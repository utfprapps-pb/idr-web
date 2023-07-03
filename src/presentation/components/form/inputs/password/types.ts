import { ReactElement } from 'react'

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
	 * Icons to be rendered at the start of the input.
	 *
	 * @example
	 * ```tsx
	 * <PasswordInput iconsStart={[<Eye />]} />
	 * ```
	 */
	iconsStart?: ReactElement[]

	/**
	 * Icons to be rendered at the end of the input.
	 *
	 * @example
	 * ```tsx
	 * <PasswordInput iconsEnd={[<Eye />]} />
	 * ```
	 */
	iconsEnd?: ReactElement[]
}
