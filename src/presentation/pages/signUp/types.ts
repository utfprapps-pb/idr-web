import { CreateUser } from '@/domain/useCases'
import { GetCep } from '@/domain/useCases/cep'
import { ValidationComposite } from '@/main/composite'

export type SignUpPageProps = {
	createUser: CreateUser
	getCep: GetCep
	validation: ValidationComposite
}
