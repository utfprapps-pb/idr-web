import type { CreateUserModel } from '@/core/domain/models/users-model'
import type { RequestInterface } from '@/core/domain/types'

export type CreateUserUseCase = RequestInterface<CreateUserModel, void>
