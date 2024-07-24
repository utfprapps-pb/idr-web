import type { CreateUserModel } from '@/domain/models/'
import type { IRequestInterface } from '@/domain/shared/types'

export interface ICreateUser extends IRequestInterface<CreateUserModel, void> {}
