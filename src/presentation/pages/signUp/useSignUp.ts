import { useCallback, useState } from 'react'

import { AxiosError } from 'axios'
import { toast } from 'react-hot-toast'

import { SignUpPageProps } from './types'
import { CreateUserModel } from '@/domain/models'
import { onlyNumbersMask } from '@/masker'
import { useHandleValidate } from '@/presentation/hooks'

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

	const { formIsValid, handleValidate } = useHandleValidate<
		keyof CreateUserModel,
		CreateUserModel
	>({
		formData,
		validation
	})

	const handleSubmit = useCallback(async () => {
		try {
			setLoading(true)
			setTouched(true)

			if (!formIsValid) {
				toast.error('Preencha os campos obrigatórios')
				return
			}

			await createUser.create(formData)

			toast.success('Conta criada com sucesso')
		} catch (error) {
			const axiosError = error as AxiosError
			toast.error(axiosError.message)
		} finally {
			setLoading(false)
		}
	}, [createUser, formData, formIsValid])

	const handleFetchCep = useCallback(
		async (cep: string) => {
			try {
				setCepLoading(true)
				const onlyNumbersCep = onlyNumbersMask(cep)

				if (onlyNumbersCep.length !== 8) return

				const { city, street } = await getCep.get(onlyNumbersCep)

				setFormData({
					...formData,
					cep,
					city,
					street
				})
			} catch (error) {
				const axiosError = error as AxiosError
				toast.error(axiosError.message)
			} finally {
				setCepLoading(false)
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[getCep]
	)

	return {
		touched,
		loading,
		cepLoading,
		formData,
		setFormData,
		handleSubmit,
		handleValidate,
		handleFetchCep
	}
}
