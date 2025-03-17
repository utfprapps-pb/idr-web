import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteCreateMachineUseCase } from '../../../data/use-cases'

import type { CreateMachineUseCase } from '../../../domain/use-cases'

export function makeRemoteCreateMachineUseCase(): CreateMachineUseCase {
  return new RemoteCreateMachineUseCase(
    'properties/:propertyId/machines',
    makeApiHttpClient<void>()
  )
}
