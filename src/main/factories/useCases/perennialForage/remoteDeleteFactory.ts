import { PerennialForageData } from '@/data/useCases/perennialForage'
import { makeApiHttpClient } from '@/main/factories/http'

import type { IDeletePerennialForage } from '@/domain/useCases/perennialForage'

export const makeRemoteDelete = (): IDeletePerennialForage =>
  new PerennialForageData.RemoteDelete(
    'perennial-forages',
    makeApiHttpClient<void>()
  )
