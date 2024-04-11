import { CreateUserModel } from '@/domain/models'
import { IRequestInterface } from '@/domain/shared'

export interface ICreateUser extends IRequestInterface<CreateUserModel, void> {}
