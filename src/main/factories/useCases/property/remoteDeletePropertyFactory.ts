import { PropertiesData } from '@/data/useCases/property'
import { makeApiHttpClient } from '@/main/factories/http'

import type { IDeleteProperty } from '@/domain/useCases/property'

export const makeRemoteDeleteProperty = (): IDeleteProperty =>
  new PropertiesData.RemoteDeleteProperty(
    'properties',
    makeApiHttpClient<void>()
  )
