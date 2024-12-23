import { VegetablesData } from '@/data/useCases/vegetable'
import { makeApiHttpClient } from '@/main/factories/http'

import type { Option } from '@/domain/shared/types'
import type { IGetAllVegetables } from '@/domain/useCases/vegetable'

export const makeRemoteGetAll = (): IGetAllVegetables =>
  new VegetablesData.RemoteGetAll(
    'vegetables/all',
    makeApiHttpClient<Option[]>()
  )
