import { PropertiesData } from '@/data/useCases/property'
import { makeApiHttpClient } from '@/main/factories/http'

import type { PropertyModel } from '@/domain/models/propertyModel'
import type { IGetProperties } from '@/domain/useCases/property'

export const makeRemoteGetProperties = (): IGetProperties =>
  new PropertiesData.RemoteGetProperties(
    'properties',
    makeApiHttpClient<PropertyModel[]>()
  )
