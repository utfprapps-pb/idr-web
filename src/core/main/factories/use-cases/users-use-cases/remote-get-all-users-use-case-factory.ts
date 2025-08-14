import { RemoteGetAllUsersUseCase } from '@/core/data/use-cases/users-use-cases'
import { makeApiHttpClient } from '@/core/main/factories/http'

import type {
  UserApiResponse,
  UserModel,
} from '@/core/domain/models/users-model'
import type { ListApiResponse } from '@/core/domain/types'
import type { GetAllUsersUseCase } from '@/core/domain/use-cases/users-use-cases'

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
