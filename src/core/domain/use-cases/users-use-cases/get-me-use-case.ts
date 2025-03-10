import type { UserModel } from '../../models/users-model'
import type { RequestInterface } from '@/core/domain/types'

export type GetMeUseCase = RequestInterface<void, UserModel>
