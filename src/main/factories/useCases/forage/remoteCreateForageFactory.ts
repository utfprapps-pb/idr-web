import { ForageData } from '@/data/useCases/forage'
import { makeApiHttpClient } from '@/main/factories/http'

import type { ICreateForage } from '@/domain/useCases/forage'

export const makeRemoteCreateForage = (): ICreateForage =>
  new ForageData.RemoteCreateForage(
    'properties/:propertyId/forages',
    makeApiHttpClient<void>()
  )
