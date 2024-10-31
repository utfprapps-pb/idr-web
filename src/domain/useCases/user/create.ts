import type { CreateUserModel } from '@/domain/models/userModel'
import type { IRequestInterface } from '@/domain/shared/types'

export type ICreateUser = IRequestInterface<CreateUserModel, void>
