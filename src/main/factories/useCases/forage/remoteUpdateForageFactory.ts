import { ForageData } from '@/data/useCases/forage'
import { makeApiHttpClient } from '@/main/factories/http'

import type { IUpdateForage } from '@/domain/useCases/forage'

export const makeRemoteUpdateForage = (): IUpdateForage =>
  new ForageData.RemoteUpdateForage(
    'properties/:propertyId/forages',
    makeApiHttpClient<void>()
  )
