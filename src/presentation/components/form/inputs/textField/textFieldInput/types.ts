export type InputProps = {
	hasError: boolean
	paddingLeft: number
	paddingRight: number
}

export type TextFieldInputProps = {
	/**
	 * The type of the text field
	 *
	 * @example
	 * ```tsx
	 * <TextFieldInput type='password' />
	 * ```
	 * @default 'text'
	 */
	type?: 'text' | 'password'

	/**
	 * The placeholder of the text field
	 *
	 * @example
	 * ```tsx
	 * <TextFieldInput placeholder='Example of placeholder />
	 */
	placeholder?: string

	/**
	 * The disable condition of the Text field
	 *
	 * @example
	 * ```tsx
	 * <TextFieldInput disabled={true} />
	 *
	 * @default false
	 */
	disabled?: boolean
}
