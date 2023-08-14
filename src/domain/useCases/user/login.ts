import { UserModel } from '@/domain/models'

export type LoginUserParams = {
	email: string
	password: string
}

export interface LoginUser {
	execute: (params: LoginUserParams) => Promise<UserModel>
}
