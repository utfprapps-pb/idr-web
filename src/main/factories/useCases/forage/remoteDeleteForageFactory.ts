import { ForageData } from '@/data/useCases/forage'
import { makeApiHttpClient } from '@/main/factories/http'

import type { IDeleteForage } from '@/domain/useCases/forage'

export const makeRemoteDeleteForage = (): IDeleteForage =>
  new ForageData.RemoteDeleteForage(
    'properties/:propertyId/forages',
    makeApiHttpClient<void>()
  )
