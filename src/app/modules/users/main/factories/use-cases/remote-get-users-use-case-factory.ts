import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteGetUsersUseCase } from '../../../data/use-cases'

import type { GetUsersUseCase } from '../../../domain/use-cases'

export function makeRemoteGetUsersUseCase(): GetUsersUseCase {
  return new RemoteGetUsersUseCase('v1/users', makeApiHttpClient())
}
