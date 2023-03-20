import { UserModel } from '@/domain/models'

export type LoginUserParams = {
	username: string
	cpf: string
}

export interface LoginUser {
	login: (params: LoginUserParams) => Promise<UserModel>
}
