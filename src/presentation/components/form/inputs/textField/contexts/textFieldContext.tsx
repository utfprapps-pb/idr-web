import {
	PropsWithChildren,
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState
} from 'react'

import { TextFieldRoot } from '../textFieldRoot'

type TextFieldContextProps = {
	actionsContainerLeftRef: React.RefObject<HTMLDivElement>
	actionsContainerRightRef: React.RefObject<HTMLDivElement>
	value: string
	error: string
	handleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void
	handleOnBlur: () => void
}

export type TextFieldProviderProps = PropsWithChildren<{
	/**
	 * The value of the text field
	 *
	 *	@example
	 * ```tsx
	 * <TextFieldInput value='Value' />
	 * ```
	 */
	value: string

	/**
	 * The function that will be called when the value of the text field changes
	 *
	 * @example
	 * ```tsx
	 * <TextFieldInput onChange={value => console.log(value)} />
	 * ```
	 */
	onChange: (value: string) => void

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
	 * <TextFieldInput touched />
	 * ```
	 * @default false
	 */
	touched?: boolean

	/**
	 * The mask of the text field
	 *
	 * @example
	 * ```tsx
	 * <TextFieldInput mask={value => value.toUpperCase()} />
	 * ```
	 */
	mask?: (value: string) => string

	/**
	 * The validator of the text field
	 *
	 * @example
	 * ```tsx
	 * <TextFieldInput validator={() => 'This field is required'} />
	 * ```
	 */
	validator?: () => string

	/**
	 * The dependency of the validator of the text field.
	 * This is used to revalidate the text field when the dependency changes
	 *
	 * @example
	 * ```tsx
	 * <TextFieldInput validator={() => 'This field is required'} validationDependency={value} />
	 * ```
	 */
	validationDependency?: any
}>

export const TextFieldContext = createContext<TextFieldContextProps>(
	{} as TextFieldContextProps
)

export const TextFieldProvider: React.FC<TextFieldProviderProps> = ({
	children,
	value,
	onChange,
	error,
	touched,
	mask,
	validator,
	validationDependency
}) => {
	const actionsContainerLeftRef = useRef<HTMLDivElement>(null)
	const actionsContainerRightRef = useRef<HTMLDivElement>(null)

	const [inputError, setInputError] = useState<string>(error ?? '')
	const [inputTouched, setInputTouched] = useState(touched)

	const handleCheckErrors = useCallback(
		() => validator && inputTouched && setInputError(validator()),
		[inputTouched, setInputError, validator]
	)

	useEffect(() => {
		handleCheckErrors()
	}, [value, validationDependency, handleCheckErrors])

	useEffect(() => {
		if (touched !== undefined && inputTouched !== touched)
			setInputTouched(touched)
	}, [touched, inputTouched])

	useEffect(() => {
		if (inputTouched) handleCheckErrors()
	}, [handleCheckErrors, inputTouched])

	const handleOnChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			setInputTouched(true)
			handleCheckErrors()
			const maskedValue = mask ? mask(event.target.value) : event.target.value
			if (onChange) onChange(maskedValue)
		},
		[handleCheckErrors, mask, onChange]
	)

	const handleOnBlur = useCallback(() => {
		setInputTouched(true)
		handleCheckErrors()
	}, [handleCheckErrors])

	const contextValue = useMemo(
		() => ({
			actionsContainerLeftRef,
			actionsContainerRightRef,
			value,
			error: inputError,
			handleOnChange,
			handleOnBlur
		}),
		[value, inputError, handleOnChange, handleOnBlur]
	)

	return (
		<TextFieldContext.Provider value={contextValue}>
			<TextFieldRoot>{children}</TextFieldRoot>
		</TextFieldContext.Provider>
	)
}

export const useTextFieldContext = () => useContext(TextFieldContext)
