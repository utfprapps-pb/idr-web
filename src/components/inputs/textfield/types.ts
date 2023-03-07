import { HTMLProps } from 'react'

type Props = {
	/**
	 * The label of the text field
	 *
	 * @example
	 * ```tsx
	 * <TextField label='Email' />
	 * ```
	 */
	label: string

	/**
	 * The function that will be called when the value of the text field changes
	 *
	 * @example
	 * ```tsx
	 * <TextField onChange={value => console.log(value)} />
	 * ```
	 */
	onChange: (value: string) => void

	/**
	 * The type of the text field
	 *
	 * @example
	 * ```tsx
	 * <TextField type='password' />
	 * ```
	 * @default 'text'
	 */
	type?: 'text' | 'password'

	/**
	 * The icon of the text field
	 *
	 * @example
	 * ```tsx
	 * <TextField icon={<EmailIcon />} />
	 * ```
	 */
	icon?: React.ReactNode

	/**
	 * The position of the icon of the text field
	 *
	 * @example
	 * ```tsx
	 * <TextField iconPosition='right />
	 * ```
	 * @default 'left'
	 */
	iconPosition?: 'left' | 'right'

	/**
	 * The icon of the password of the text field
	 *
	 * @example
	 * ```tsx
	 * <TextField passwordIcon={<EyeIcon />} />
	 * ```
	 */
	passwordIcon?: React.ReactNode

	/**
	 * The error of the text field
	 *
	 * @example
	 * ```tsx
	 * <TextField error='This field is required' />
	 * ```
	 * @default ''
	 */
	error?: string

	/**
	 * The touched state of the text field
	 *
	 * @example
	 * ```tsx
	 * <TextField touched />
	 * ```
	 * @default false
	 */
	touched?: boolean

	/**
	 * The dependency of the validation of the text field
	 *
	 * @example
	 * ```tsx
	 * <TextField validationDependency={email} />
	 * ```
	 */
	validationDependency?: unknown

	/**
	 * The validator of the text field
	 *
	 * @example
	 * ```tsx
	 * <TextField validator={() => 'This field is required'} />
	 * ```
	 */
	validator?: () => string | null
}

export type TextFieldProps = HTMLProps<HTMLInputElement> & Props
