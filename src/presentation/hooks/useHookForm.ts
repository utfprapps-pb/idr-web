import {
	DefaultValues,
	FieldValues,
	Resolver,
	SubmitErrorHandler,
	SubmitHandler,
	UseFormProps,
	useForm
} from 'react-hook-form'
import toast from 'react-hot-toast'

export type UseHookFormProps<TDefaultValues extends FieldValues> = {
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

	const onSubmit = (successCallback: SubmitHandler<TDefaultValues>) => {
		const errorCallback: SubmitErrorHandler<TDefaultValues> = () => {
			toast.error('Preencha os campos obrigatórios')
		}

		return handleSubmit(successCallback, errorCallback)
	}

	return {
		...form,
		handleSubmit: onSubmit,
		buttonDisabled
	}
}
