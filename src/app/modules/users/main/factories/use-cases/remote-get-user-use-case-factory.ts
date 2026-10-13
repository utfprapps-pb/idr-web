import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteGetUserUseCase } from '../../../data/use-cases'

import type { GetUserUseCase } from '../../../domain/use-cases'

export function makeRemoteGetUserUseCase(): GetUserUseCase {
  return new RemoteGetUserUseCase('v1/users/:userId', makeApiHttpClient())
}
