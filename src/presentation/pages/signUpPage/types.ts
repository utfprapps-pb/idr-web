import { Control } from 'react-hook-form'

import type { CreateUserModel } from '@/domain/models/userModel'
import type { IGetCep } from '@/domain/useCases/cep'
import type { ICreateUser } from '@/domain/useCases/user'

export type SignUpPageProps = {
	createUser: ICreateUser
	getCep: IGetCep
}

export type UseInputDataProps = {
	control: Control<CreateUserModel>
	cepLoading: boolean
}
