import type { UserListItemModel } from '../models/users-management-model'
import type { RequestInterface } from '@/core/domain/types'

export type GetUsersUseCase = RequestInterface<
  { page: number; terms?: string; active?: boolean },
  { resources: UserListItemModel[]; totalPages: number }
>
