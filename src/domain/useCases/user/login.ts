import { UserModel } from '@/domain/models'

export type LoginUserParams = {
	username: string
	cpf: string
}

export type LoginUser = (params: LoginUserParams) => Promise<UserModel>
