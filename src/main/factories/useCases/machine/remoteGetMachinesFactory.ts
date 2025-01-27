import { MachineData } from '@/data/useCases/machine'
import { makeApiHttpClient } from '@/main/factories/http'

import type { MachineModel } from '@/domain/models/machineModel'
import type { IGetMachines } from '@/domain/useCases/machine'

export const makeRemoteGetMachines = (): IGetMachines =>
  new MachineData.RemoteGetMachines(
    'properties/:propertyId/machines',
    makeApiHttpClient<MachineModel[]>()
  )
