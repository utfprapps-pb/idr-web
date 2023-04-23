import { TextFieldProps } from '../textfield'

type Props = {
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
	 * The callback function that is triggered when the user types in the input.
	 *
	 * @example
	 * ```tsx
	 * <DebounceTextField onSearch={value => console.log(value)} />
	 * ```
	 */
	onSearch: (value: string) => void
}

export type DebounceTextFieldProps = TextFieldProps & Props
