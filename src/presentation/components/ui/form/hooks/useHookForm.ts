import {
	DefaultValues,
	FieldValues,
	Resolver,
	UseFormProps,
	useForm
} from 'react-hook-form'

type UseHookFormProps<TDefaultValues extends FieldValues> = {
	values?: UseFormProps<TDefaultValues>['values']
	defaultValues?: DefaultValues<TDefaultValues>
	schemaResolver?: Resolver<TDefaultValues>
}

export const useHookForm = <TDefaultValues extends FieldValues>({
	values,
	defaultValues,
	schemaResolver
}: UseHookFormProps<TDefaultValues>) => {
	const form = useForm<TDefaultValues>({
		mode: 'all',
		defaultValues,
		values,
		resolver: schemaResolver
	})

	const {
		formState: { isSubmitting, isValidating },
		handleSubmit
	} = form

	const buttonDisabled = isSubmitting || isValidating

	const onSubmit = (successCallback: (data: TDefaultValues) => void) =>
		handleSubmit(successCallback, () => {
			// Todo @Minozzzi 22/02/24: refactor with toast component
			console.error(`Campos do formulário inválidos`)
		})

	return {
		...form,
		handleSubmit: onSubmit,
		buttonDisabled
	}
}
