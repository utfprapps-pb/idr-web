import { VegetableData } from '@/data/useCases/vegetable'
import { makeApiHttpClient } from '@/main/factories/http'

import type { Option } from '@/domain/shared/types'
import type { IGetAllVegetables } from '@/domain/useCases/vegetable'

export const makeRemoteGetAllVegetables = (): IGetAllVegetables =>
  new VegetableData.RemoteGetAllVegetables(
    'vegetables/all',
    makeApiHttpClient<Option[]>()
  )
