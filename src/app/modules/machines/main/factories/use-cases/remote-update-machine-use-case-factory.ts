import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteUpdateMachineUseCase } from '../../../data/use-cases'

import type { UpdateMachineUseCase } from '../../../domain/use-cases'

export function makeRemoteUpdateMachineUseCase(): UpdateMachineUseCase {
  return new RemoteUpdateMachineUseCase(
    'properties/:propertyId/machines',
    makeApiHttpClient<void>()
  )
}
