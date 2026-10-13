import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteUpdateUserPermissionsUseCase } from '../../../data/use-cases'

import type { UpdateUserPermissionsUseCase } from '../../../domain/use-cases'

export function makeRemoteUpdateUserPermissionsUseCase(): UpdateUserPermissionsUseCase {
  return new RemoteUpdateUserPermissionsUseCase(
    'v1/users/:userId/permissions',
    makeApiHttpClient()
  )
}
