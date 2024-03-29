import { useCallback, useState } from 'react'

import { AxiosError } from 'axios'
import { toast } from 'react-hot-toast'

import { CreateUserModel } from '@/domain/models'
import { PAGE_PATHS } from '@/main/routes/paths'
import { onlyNumbersMask } from '@/masker'
import { useHookForm } from '@/presentation/components/ui/form/hooks/useHookForm'
import { useIdrHistory } from '@/presentation/hooks'

import { SignUpPageProps } from './types'

const INITIAL_FORM_DATA: CreateUserModel = {
	name: '',
	email: '',
	password: '',
	confirmPassword: '',
	cpf: '',
	phone: '',
	graduationYear: '',
	professionalRegister: '',
	cep: '',
	street: '',
	city: '',
	houseNumber: ''
}

export const useSignUp = (props: SignUpPageProps) => {
	const { createUser, getCep, validation } = props
	const { firstStepValidation, validation: validationForm } = validation

	const [cepLoading, setCepLoading] = useState(false)
	const [firstStepData, setFirstStepData] = useState<Partial<CreateUserModel>>(
		{}
	)
	const [isFirstStep, setIsFirstStep] = useState(true)

	const { navigate } = useIdrHistory()

	const form = useHookForm<CreateUserModel>({
		defaultValues: INITIAL_FORM_DATA,
		schemaResolver: (data) => {
			if (isFirstStep) return firstStepValidation.validate({ data })

			return validationForm.validate({ data })
		}
	})

	const {
		buttonDisabled,
		getValues,
		setValue,
		handleSubmit: handleSubmitForm
	} = form

	const goToLoginPage = useCallback(
		() => navigate(PAGE_PATHS.login),
		[navigate]
	)

	const onSubmitFirstStep = (
		data: Partial<CreateUserModel>,
		event?: React.BaseSyntheticEvent
	) => {
		event?.preventDefault()
		setFirstStepData(data)
		setIsFirstStep(false)
	}

	const onSubmit = useCallback(
		async (data: CreateUserModel, event?: React.BaseSyntheticEvent) => {
			event?.preventDefault()
			try {
				const allStepData = {
					...firstStepData,
					...data
				}

				await createUser.execute(allStepData)
				goToLoginPage()
				toast.success('Conta criada com sucesso')
			} catch (error) {
				const axiosError = error as AxiosError
				toast.error(axiosError.message)
			}
		},
		[createUser, firstStepData, goToLoginPage]
	)

	const handleSubmit = handleSubmitForm(
		isFirstStep ? onSubmitFirstStep : onSubmit
	)

	const handleFetchCep = useCallback(async () => {
		try {
			const cep = getValues('cep')
			const onlyNumbersCep = onlyNumbersMask(cep)
			if (onlyNumbersCep.length !== 8) return

			setCepLoading(true)

			const { city, street } = await getCep.execute(onlyNumbersCep)

			const fieldsToUpdate = {
				cep,
				city,
				street
			}

			Object.entries(fieldsToUpdate).forEach(([field, value]) => {
				const typedField = field as keyof CreateUserModel
				setValue(typedField, value, {
					shouldDirty: true,
					shouldValidate: true,
					shouldTouch: true
				})
			})
		} catch (error) {
			const axiosError = error as AxiosError
			toast.error(axiosError.message)
		} finally {
			setCepLoading(false)
		}
	}, [getCep, getValues, setValue])

	const handleOnClearCepDebounce = useCallback(() => {
		const fieldsToUpdate = {
			cep: '',
			city: '',
			street: ''
		}

		Object.entries(fieldsToUpdate).forEach(([field, value]) => {
			const typedField = field as keyof CreateUserModel
			setValue(typedField, value, {
				shouldDirty: true,
				shouldValidate: true,
				shouldTouch: true
			})
		})
	}, [setValue])

	return {
		cepLoading,
		buttonDisabled,
		form,
		isFirstStep,
		goToLoginPage,
		handleFetchCep,
		handleSubmit,
		handleOnClearCepDebounce
	}
}
