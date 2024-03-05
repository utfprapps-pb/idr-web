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

	const [cepLoading, setCepLoading] = useState(false)

	const { navigate } = useIdrHistory()

	const {
		buttonDisabled,
		setValue,
		handleSubmit: handleSubmitForm
	} = useHookForm<CreateUserModel>({
		defaultValues: INITIAL_FORM_DATA,
		schemaResolver: (data) => validation.validate({ data })
	})

	const goToLoginPage = useCallback(
		() => navigate(PAGE_PATHS.login),
		[navigate]
	)

	const onSubmit = useCallback(
		async (data: CreateUserModel) => {
			try {
				await createUser.execute(data)
				goToLoginPage()
				toast.success('Conta criada com sucesso')
			} catch (error) {
				const axiosError = error as AxiosError
				toast.error(axiosError.message)
			}
		},
		[createUser, goToLoginPage]
	)

	const handleSubmit = handleSubmitForm(onSubmit)

	const handleFetchCep = useCallback(
		async (cep: string) => {
			try {
				setCepLoading(true)
				const onlyNumbersCep = onlyNumbersMask(cep)

				if (onlyNumbersCep.length !== 8) return

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
		},
		[getCep, setValue]
	)

	return {
		cepLoading,
		buttonDisabled,
		goToLoginPage,
		handleFetchCep,
		handleSubmit
	}
}
