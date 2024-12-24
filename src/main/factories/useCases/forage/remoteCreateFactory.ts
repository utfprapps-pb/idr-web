import { ForageData } from '@/data/useCases/forage'
import { makeApiHttpClient } from '@/main/factories/http'

import type { ICreateForage } from '@/domain/useCases/forage'

export const makeRemoteCreate = (): ICreateForage =>
  new ForageData.RemoteCreate(
    'properties/:propertyId/forages',
    makeApiHttpClient<void>()
  )
