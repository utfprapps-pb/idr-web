import { CreateUserModel } from '@/domain/models'

export interface CreateUser {
	create: (params: CreateUserModel) => Promise<void>
}
