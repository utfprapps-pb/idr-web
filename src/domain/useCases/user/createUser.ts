import { CreateUserModel } from '@/domain/models'

export interface ICreateUser {
	execute: (params: CreateUserModel) => Promise<void>
}
