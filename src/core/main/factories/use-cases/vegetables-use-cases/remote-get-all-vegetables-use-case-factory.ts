import { RemoteGetAllVegetablesUseCase } from '@/core/data/use-cases/vegetables-use-cases'
import { makeApiHttpClient } from '@/core/main/factories/http'

import type { Option } from '@/core/domain/types'
import type { GetAllVegetablesUseCase } from '@/core/domain/use-cases/vegetables-use-cases'

export function makeRemoteGetAllVegetablesUseCase(): GetAllVegetablesUseCase {
  return new RemoteGetAllVegetablesUseCase(
    'vegetables/all',
    makeApiHttpClient<Option[]>()
  )
}
