import { RemoteGetAllUsersUseCase } from '@/core/data/use-cases/users-use-cases'
import { makeApiHttpClient } from '@/core/main/factories/http'

import type { UserApiResponse } from '@/core/domain/models/users-model'
import type { ListApiResponse, Option } from '@/core/domain/types'
import type { GetAllUsersUseCase } from '@/core/domain/use-cases/users-use-cases'

export function makeRemoteGetAllUsersUseCase(): GetAllUsersUseCase {
  return new RemoteGetAllUsersUseCase(
    'users/all',
    makeApiHttpClient<
      Option,
      UserApiResponse,
      ListApiResponse<UserApiResponse[]>
    >()
  )
}
