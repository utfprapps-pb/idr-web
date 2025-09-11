import type { UserModel } from '../../models/users-model'
import type {
  RequestInterface,
  ListParams,
  ListResponse,
} from '@/core/domain/types'

export type GetAllUsersUseCase = RequestInterface<
  ListParams<UserModel>,
  ListResponse<UserModel>
>
