import { Control } from 'react-hook-form'

import { CreateUserModel } from '@/domain/models'
import { ICreateUser } from '@/domain/useCases'
import { IGetCep } from '@/domain/useCases/cep'
import { ValidationComposite } from '@/main/composite'

export type SignUpPageProps = {
	createUser: ICreateUser
	getCep: IGetCep
	validation: {
		firstStepValidation: ValidationComposite
		validation: ValidationComposite
	}
}

export type UseInputDataProps = {
	control: Control<CreateUserModel>
	cepLoading: boolean
	cepDebounceCallback: () => Promise<void>
	handleOnClearCepDebounce: () => void
}
