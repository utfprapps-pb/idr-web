import { Control } from 'react-hook-form'

import type { CreateUserModel } from '@/domain/models'
import type { ICreateUser } from '@/domain/useCases'
import type { IGetCep } from '@/domain/useCases/cep'

export type SignUpPageProps = {
	createUser: ICreateUser
	getCep: IGetCep
}

export type UseInputDataProps = {
	control: Control<CreateUserModel>
	cepLoading: boolean
}
