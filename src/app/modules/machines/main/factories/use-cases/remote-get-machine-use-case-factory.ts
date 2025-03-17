import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteGetMachineUseCase } from '../../../data/use-cases'

import type { MachineDetailsModel } from '../../../domain/models/machines-model'
import type { GetMachineUseCase } from '../../../domain/use-cases'

export function makeRemoteGetMachineUseCase(): GetMachineUseCase {
  return new RemoteGetMachineUseCase(
    'properties/:propertyId/machines',
    makeApiHttpClient<MachineDetailsModel>()
  )
}
