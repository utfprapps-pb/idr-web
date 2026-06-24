import { RemoteSearchUsersUseCase } from '@/core/data/use-cases/users-use-cases'
import { makeApiHttpClient } from '@/core/main/factories/http'

import type { SearchUsersUseCase } from '@/core/domain/use-cases/users-use-cases'

export function makeRemoteSearchUsersUseCase(): SearchUsersUseCase {
  return new RemoteSearchUsersUseCase('/v1/users', makeApiHttpClient())
}
