import type { UserDetailModel } from '../models/users-management-model'
import type { RequestInterface } from '@/core/domain/types'

export type GetUserUseCase = RequestInterface<
  { userId: string },
  UserDetailModel
>
