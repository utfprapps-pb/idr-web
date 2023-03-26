import { UserModel } from '@/domain/models'

export type LoginUserParams = {
	username: string
	password: string
}

export interface LoginUser {
	login: (params: LoginUserParams) => Promise<UserModel>
}
