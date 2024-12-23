import { PerennialForageData } from '@/data/useCases/perennialForage'
import { makeApiHttpClient } from '@/main/factories/http'

import type { IUpdatePerennialForage } from '@/domain/useCases/perennialForage'

export const makeRemoteUpdate = (): IUpdatePerennialForage =>
  new PerennialForageData.RemoteUpdate(
    'properties/:propertyId/perennial-forages',
    makeApiHttpClient<void>()
  )
