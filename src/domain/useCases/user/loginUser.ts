import type { UserModel } from '@/domain/models'
import type { IRequestInterface } from '@/domain/shared/types'

export type LoginUserParams = {
	email: string
	password: string
}

export interface ILoginUser
	extends IRequestInterface<LoginUserParams, UserModel> {}
