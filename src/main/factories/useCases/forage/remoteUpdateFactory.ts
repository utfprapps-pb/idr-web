import { ForageData } from '@/data/useCases/forage'
import { makeApiHttpClient } from '@/main/factories/http'

import type { IUpdateForage } from '@/domain/useCases/forage'

export const makeRemoteUpdate = (): IUpdateForage =>
  new ForageData.RemoteUpdate(
    'properties/:propertyId/forages',
    makeApiHttpClient<void>()
  )
