import { RemoteGetMeUseCase } from '@/core/data/use-cases/users-use-cases'
import { makeApiHttpClient } from '@/core/main/factories/http'

import type { GetMeUseCase } from '@/core/domain/use-cases/users-use-cases'

export function makeRemoteGetMeUseCase(): GetMeUseCase {
  return new RemoteGetMeUseCase('users/me', makeApiHttpClient())
}
