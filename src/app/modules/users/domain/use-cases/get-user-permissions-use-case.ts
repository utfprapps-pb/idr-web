import type { UserPermissionModel } from '../models/users-management-model'
import type { RequestInterface } from '@/core/domain/types'

export type GetUserPermissionsUseCase = RequestInterface<
  { userId: string },
  UserPermissionModel
>
