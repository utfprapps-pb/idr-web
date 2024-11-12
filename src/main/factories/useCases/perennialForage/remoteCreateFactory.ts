import { PerennialForageData } from '@/data/useCases/perennialForage'
import { makeApiHttpClient } from '@/main/factories/http'

import type { ICreatePerennialForage } from '@/domain/useCases/perennialForage'

export const makeRemoteCreate = (): ICreatePerennialForage =>
  new PerennialForageData.RemoteCreate(
    'perennial-forages',
    makeApiHttpClient<void>()
  )
