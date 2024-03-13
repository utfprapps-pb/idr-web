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
	cepDebounceCallback: () => Promise<void>
}
