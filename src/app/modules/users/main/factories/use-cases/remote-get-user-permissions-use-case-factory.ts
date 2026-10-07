import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteGetUserPermissionsUseCase } from '../../../data/use-cases'

import type { GetUserPermissionsUseCase } from '../../../domain/use-cases'

export function makeRemoteGetUserPermissionsUseCase(): GetUserPermissionsUseCase {
  return new RemoteGetUserPermissionsUseCase(
    'v1/users/:userId/permissions',
    makeApiHttpClient()
  )
}
