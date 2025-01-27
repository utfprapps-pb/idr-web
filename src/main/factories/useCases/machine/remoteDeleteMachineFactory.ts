import { MachineData } from '@/data/useCases/machine'
import { makeApiHttpClient } from '@/main/factories/http'

import type { IDeleteMachine } from '@/domain/useCases/machine'

export const makeRemoteDeleteMachine = (): IDeleteMachine =>
  new MachineData.RemoteDeleteMachine(
    'properties/:propertyId/machines',
    makeApiHttpClient<void>()
  )
