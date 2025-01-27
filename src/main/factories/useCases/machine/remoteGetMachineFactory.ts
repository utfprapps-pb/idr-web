import { MachineData } from '@/data/useCases/machine'
import { makeApiHttpClient } from '@/main/factories/http'

import type { MachineDetailsModel } from '@/domain/models/machineModel'
import type { IGetMachine } from '@/domain/useCases/machine'

export const makeRemoteGetMachine = (): IGetMachine =>
  new MachineData.RemoteGetMachine(
    'properties/:propertyId/machines',
    makeApiHttpClient<MachineDetailsModel>()
  )
