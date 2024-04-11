import { UserModel } from '@/domain/models'
import { IRequestInterface } from '@/domain/shared'

export type LoginUserParams = {
	email: string
	password: string
}

export interface ILoginUser
	extends IRequestInterface<LoginUserParams, UserModel> {}
