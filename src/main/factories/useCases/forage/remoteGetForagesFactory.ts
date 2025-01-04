import { ForageData } from '@/data/useCases/forage'
import { makeApiHttpClient } from '@/main/factories/http'

import type { ForageModel } from '@/domain/models/forageModel'
import type { IGetForages } from '@/domain/useCases/forage'

export const makeRemoteGetForages = (): IGetForages =>
  new ForageData.RemoteGetForages(
    'properties/:propertyId/forages',
    makeApiHttpClient<ForageModel[]>()
  )
