import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteToggleUserActiveUseCase } from '../../../data/use-cases'

import type { ToggleUserActiveUseCase } from '../../../domain/use-cases'

export function makeRemoteToggleUserActiveUseCase(): ToggleUserActiveUseCase {
  return new RemoteToggleUserActiveUseCase(
    'v1/users/:userId/active',
    makeApiHttpClient()
  )
}
