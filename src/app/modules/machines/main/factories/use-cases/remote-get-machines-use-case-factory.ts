import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteGetMachinesUseCase } from '../../../data/use-cases'

import type {
  MachineApiResponse,
  MachineModel,
} from '../../../domain/models/machines-model'
import type { GetMachinesUseCase } from '../../../domain/use-cases'
import type { ListApiResponse } from '@/core/domain/types'

export function makeRemoteGetMachinesUseCase(): GetMachinesUseCase {
  return new RemoteGetMachinesUseCase(
    'properties/:propertyId/machines',
    makeApiHttpClient<
      MachineModel,
      MachineApiResponse,
      ListApiResponse<MachineApiResponse[]>
    >()
  )
}
