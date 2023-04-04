import { useCallback, useState } from 'react'

import { toast } from 'react-hot-toast'

import { EmailInUseError } from '@/domain/errors'
import { CreateUserModel } from '@/domain/models'
import { CreateUser } from '@/domain/useCases'
import { ValidationComposite } from '@/main/composite'
import { useHandleValidate } from '@/presentation/hooks'

type UseSignUpProps = {
	createUser: CreateUser
	validation: ValidationComposite
}

const INITIAL_FORM_DATA: CreateUserModel = {
	name: '',
	email: '',
	phone: '',
	graduationYear: '',
	professionalRegister: '',
	houseNumber: ''
}

export const useSignUp = (props: UseSignUpProps) => {
	const { createUser, validation } = props

	const [loading, setLoading] = useState(false)
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
			if (error instanceof EmailInUseError) {
				toast.error(error.message)
				return
			}

			toast.error('Erro inesperado, tente novamente')
		} finally {
			setLoading(false)
		}
	}, [createUser, formData, formIsValid])

	return {
		touched,
		loading,
		formData,
		setFormData,
		handleSubmit,
		handleValidate
	}
}
