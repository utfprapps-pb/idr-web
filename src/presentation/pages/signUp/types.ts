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

// ToDo @Minozzzi 2024-03-07: turn it global
export type InputData = {
	name: keyof CreateUserModel
	label: string
	placeholder: string
}

export type InputDataGrouped = {
	key: string
	group: InputData[]
}

export type CreateUserModelFirstStep = Omit<
	CreateUserModel,
	'cep' | 'street' | 'city' | 'houseNumber'
>
