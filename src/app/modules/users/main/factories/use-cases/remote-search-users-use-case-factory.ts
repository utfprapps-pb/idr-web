import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteSearchUsersUseCase } from '../../../data/use-cases'

import type { SearchUsersUseCase } from '../../../domain/use-cases'

export function makeRemoteSearchUsersUseCase(): SearchUsersUseCase {
  return new RemoteSearchUsersUseCase('v1/users', makeApiHttpClient())
}
