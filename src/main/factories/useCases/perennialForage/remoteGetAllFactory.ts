import { PerennialForageData } from '@/data/useCases/perennialForage'
import { makeApiHttpClient } from '@/main/factories/http'

import type { PerennialForageModel } from '@/domain/models/perennialForageModel'
import type { IGetPerennialForages } from '@/domain/useCases/perennialForage'

export const makeRemoteGetAll = (): IGetPerennialForages =>
  new PerennialForageData.RemoteGetAll(
    'properties/:propertyId/perennial-forages',
    makeApiHttpClient<PerennialForageModel[]>()
  )
