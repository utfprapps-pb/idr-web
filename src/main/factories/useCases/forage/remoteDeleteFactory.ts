import { ForageData } from '@/data/useCases/forage'
import { makeApiHttpClient } from '@/main/factories/http'

import type { IDeleteForage } from '@/domain/useCases/forage'

export const makeRemoteDelete = (): IDeleteForage =>
  new ForageData.RemoteDelete(
    'properties/:propertyId/forages',
    makeApiHttpClient<void>()
  )
