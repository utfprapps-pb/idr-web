import type { UserPermissionModel } from '../models/users-management-model'
import type { RequestInterface } from '@/core/domain/types'

export type UpdateUserPermissionsUseCase = RequestInterface<
  { userId: string; name: string; username: string } & UserPermissionModel,
  void
>
