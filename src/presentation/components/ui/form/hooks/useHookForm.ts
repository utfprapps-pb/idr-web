import {
	DefaultValues,
	FieldValues,
	Resolver,
	UseFormProps,
	useForm
} from 'react-hook-form'
import toast from 'react-hot-toast'

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
			toast.error('Preencha os campos obrigatórios')
		})

	return {
		...form,
		handleSubmit: onSubmit,
		buttonDisabled
	}
}
