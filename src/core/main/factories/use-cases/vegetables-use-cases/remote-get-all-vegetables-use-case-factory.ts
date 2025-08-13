import { RemoteGetAllVegetablesUseCase } from '@/core/data/use-cases/vegetables-use-cases'
import { makeApiHttpClient } from '@/core/main/factories/http'

import type {
  VegetableApiResponse,
  VegetableModel,
} from '@/core/domain/models/vegetables-model'
import type { ListApiResponse } from '@/core/domain/types'
import type { GetAllVegetablesUseCase } from '@/core/domain/use-cases/vegetables-use-cases'

export function makeRemoteGetAllVegetablesUseCase(): GetAllVegetablesUseCase {
  return new RemoteGetAllVegetablesUseCase(
    'vegetables',
    makeApiHttpClient<
      VegetableModel,
      VegetableApiResponse,
      ListApiResponse<VegetableApiResponse[]>
    >()
  )
}
