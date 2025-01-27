import { MachineData } from '@/data/useCases/machine'
import { makeApiHttpClient } from '@/main/factories/http'

import type { ICreateMachine } from '@/domain/useCases/machine'

export const makeRemoteCreateMachine = (): ICreateMachine =>
  new MachineData.RemoteCreateMachine(
    'properties/:propertyId/machines',
    makeApiHttpClient<void>()
  )
