import { useCallback, useState } from 'react'

import { AxiosError } from 'axios'
import { toast } from 'react-hot-toast'

import { CreateUserModel } from '@/domain/models'
import { PAGE_PATHS } from '@/main/routes/paths'
import { onlyNumbersMask } from '@/masker'
import { useHandleValidate, useIdrHistory } from '@/presentation/hooks'

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

	const [loading, setLoading] = useState(false)
	const [cepLoading, setCepLoading] = useState(false)
	const [touched, setTouched] = useState(false)
	const [formData, setFormData] = useState<CreateUserModel>(INITIAL_FORM_DATA)

	const { navigate } = useIdrHistory()

	const { formIsValid, handleValidate } = useHandleValidate<
		keyof CreateUserModel,
		CreateUserModel
	>({
		formData,
		validation
	})

	const goToLoginPage = useCallback(
		() => navigate(PAGE_PATHS.login),
		[navigate]
	)

	const handleSubmit = useCallback(async () => {
		try {
			setLoading(true)
			setTouched(true)

			if (!formIsValid) {
				toast.error('Preencha os campos obrigatórios')
				return
			}

			await createUser.execute(formData)
			goToLoginPage()
			toast.success('Conta criada com sucesso')
		} catch (error) {
			const axiosError = error as AxiosError
			toast.error(axiosError.message)
		} finally {
			setLoading(false)
		}
	}, [createUser, formData, formIsValid, goToLoginPage])

	const handleFetchCep = useCallback(
		async (cep: string) => {
			try {
				setCepLoading(true)
				const onlyNumbersCep = onlyNumbersMask(cep)

				if (onlyNumbersCep.length !== 8) return

				const { city, street } = await getCep.execute(onlyNumbersCep)

				setFormData((state) => ({
					...state,
					cep,
					city,
					street
				}))
			} catch (error) {
				const axiosError = error as AxiosError
				toast.error(axiosError.message)
			} finally {
				setCepLoading(false)
			}
		},
		[getCep]
	)

	return {
		cepLoading,
		formData,
		loading,
		touched,
		goToLoginPage,
		handleFetchCep,
		handleSubmit,
		handleValidate,
		setFormData
	}
}
