export type TextFieldProps = {
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
	 * The value of the text field
	 *
	 *	@example
	 * ```tsx
	 * <TextField value='Value' />
	 * ```
	 */
	value: string

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
	 * The placeholder of the text field
	 *
	 * @example
	 * ```tsx
	 * <TextField placeholder='Example of placeholder />
	 */
	placeholder?: string

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
	 * The disable condition of the Text field
	 *
	 * @example
	 * ```tsx
	 * <TextField disabled={true} />
	 *
	 * @default false
	 */
	disabled?: boolean

	/**
	 * The array of icons that will be positioned at the beginning
	 *
	 * @example
	 * ```tsx
	 * <TextField iconsStart={[<Lock />, <Eye />]} />
	 * ```
	 * @default []
	 */
	iconsStart?: React.ReactElement[]

	/**
	 * The array of icons that will be positioned at the end
	 *
	 * @example
	 * ```tsx
	 * <TextField iconsEnd={[<Lock />, <Eye />]} />
	 * ```
	 * @default []
	 */
	iconsEnd?: React.ReactElement[]

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
