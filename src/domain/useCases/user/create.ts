import { CreateUserModel } from '@/domain/models'

export interface CreateUser {
	execute: (params: CreateUserModel) => Promise<void>
}
