import type { CreateUserModel } from '../models/auth-model'
import type { RequestInterface } from '@/core/domain/types'

export type CreateUserUseCase = RequestInterface<CreateUserModel, void>
