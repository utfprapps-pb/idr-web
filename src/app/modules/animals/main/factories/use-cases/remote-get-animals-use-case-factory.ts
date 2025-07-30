import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteGetAnimalsUseCase } from '../../../data/use-cases'

import type {
  AnimalApiResponse,
  AnimalModel,
} from '../../../domain/models/animals-model'
import type { GetAnimalsUseCase } from '../../../domain/use-cases'
import type { ListApiResponse } from '@/core/domain/types'

export function makeRemoteGetAnimalsUseCase(): GetAnimalsUseCase {
  return new RemoteGetAnimalsUseCase(
    // TODO: refatoração do back-end pra restrição por request mapping
    'properties/:propertyId/animals',
    makeApiHttpClient<
      AnimalModel,
      AnimalApiResponse,
      ListApiResponse<AnimalApiResponse[]>
    >()
  )
}
