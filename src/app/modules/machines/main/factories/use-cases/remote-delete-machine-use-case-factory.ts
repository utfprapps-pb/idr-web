import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteDeleteMachineUseCase } from '../../../data/use-cases'

import type { DeleteMachineUseCase } from '../../../domain/use-cases'

export function makeRemoteDeleteMachineUseCase(): DeleteMachineUseCase {
  return new RemoteDeleteMachineUseCase(
    'properties/:propertyId/machines',
    makeApiHttpClient<void>()
  )
}
