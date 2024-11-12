import { PerennialForageData } from '@/data/useCases/perennialForage'
import { makeApiHttpClient } from '@/main/factories/http'

import type { PerennialForageDetailsModel } from '@/domain/models/perennialForageModel'
import type { IGetPerennialForage } from '@/domain/useCases/perennialForage'

export const makeRemoteGetOne = (): IGetPerennialForage =>
  new PerennialForageData.RemoteGetOne(
    'perennial-forages',
    makeApiHttpClient<PerennialForageDetailsModel>()
  )
