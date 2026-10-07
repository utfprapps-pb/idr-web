import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteGetAllUsersUseCase } from '../../../data/use-cases'

import type {
  UserApiResponse,
  UserModel,
} from '../../../domain/models/users-model'
import type { GetAllUsersUseCase } from '../../../domain/use-cases'
import type { ListApiResponse } from '@/core/domain/types'

export function makeRemoteGetAllUsersUseCase(): GetAllUsersUseCase {
  return new RemoteGetAllUsersUseCase(
    'users',
    makeApiHttpClient<
      UserModel,
      UserApiResponse,
      ListApiResponse<UserApiResponse[]>
    >()
  )
}
