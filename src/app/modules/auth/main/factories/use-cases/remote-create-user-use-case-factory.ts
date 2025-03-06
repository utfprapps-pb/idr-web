import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteCreateUserUseCase } from '../../../data/use-cases'

import type { CreateUserUseCase } from '../../../domain/use-cases'

export function makeRemoteCreateUserUseCase(): CreateUserUseCase {
  return new RemoteCreateUserUseCase('users', makeApiHttpClient<void>())
}
