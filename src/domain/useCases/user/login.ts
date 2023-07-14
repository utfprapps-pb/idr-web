import { UserModel } from '@/domain/models'

export type LoginUserParams = {
	email: string
	password: string
}

export interface LoginUser {
	login: (params: LoginUserParams) => Promise<UserModel>
}
