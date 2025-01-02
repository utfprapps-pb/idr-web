import { ForageData } from '@/data/useCases/forage'
import { makeApiHttpClient } from '@/main/factories/http'

import type { ForageDetailsModel } from '@/domain/models/forageModel'
import type { IGetForage } from '@/domain/useCases/forage'

export const makeRemoteGetOne = (): IGetForage =>
  new ForageData.RemoteGetOne(
    'properties/:propertyId/forages',
    makeApiHttpClient<ForageDetailsModel>()
  )
