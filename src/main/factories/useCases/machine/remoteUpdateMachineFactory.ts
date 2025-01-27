import { MachineData } from '@/data/useCases/machine'
import { makeApiHttpClient } from '@/main/factories/http'

import type { IUpdateMachine } from '@/domain/useCases/machine'

export const makeRemoteUpdateMachine = (): IUpdateMachine =>
  new MachineData.RemoteUpdateMachine(
    'properties/:propertyId/machines',
    makeApiHttpClient<void>()
  )
