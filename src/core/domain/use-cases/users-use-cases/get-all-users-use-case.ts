import type { UserModel } from '@/app/modules/users/domain/models/users-model'
import type {
  RequestInterface,
  ListParams,
  ListResponse,
} from '@/core/domain/types'

export type GetAllUsersUseCase = RequestInterface<
  ListParams<UserModel>,
  ListResponse<UserModel>
>
