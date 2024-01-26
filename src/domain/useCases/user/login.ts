import { UserModel } from '@/domain/models'

export type LoginUserParams = {
	email: string
	password: string
}

export interface ILoginUser {
	execute: (params: LoginUserParams) => Promise<UserModel>
}
