import { TextFieldProps } from '../textField'

type Props = {
	/**
	 * The label of the input.
	 *
	 * @example
	 * ```tsx
	 * <DebounceTextField label="Name" />
	 * ```
	 */
	label: string

	/**
	 * The debounce time in milliseconds.
	 *
	 * @example
	 * ```tsx
	 * <DebounceTextField debounce={1000} />
	 * ```
	 * @default 500
	 */
	debounce?: number

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
	 * The loading when the debounce is active.
	 *
	 * @example
	 * ```tsx
	 * <DebounceTextField callbackLoading={true} />
	 * ```
	 */
	callbackLoading: boolean

	/**
	 * The function to be called after the debounce time.
	 *
	 * @example
	 * ```tsx
	 * <DebounceTextField callback={() => console.log('Hello World!')} />
	 * ```
	 */
	callback: () => void
}

export type DebounceTextFieldProps = TextFieldProps & Props
