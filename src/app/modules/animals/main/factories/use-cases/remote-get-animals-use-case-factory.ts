import { makeApiHttpClient } from '@/core/main/factories/http'

import {
  RemoteGetAnimalsUseCase,
  type AnimalSearchApiItem,
} from '../../../data/use-cases/remote-get-animals-use-case'

import type { AnimalModel } from '../../../domain/models/animals-model'
import type { GetAnimalsUseCase } from '../../../domain/use-cases'
import type { SearchApiResponse } from '@/core/domain/types'

export function makeRemoteGetAnimalsUseCase(): GetAnimalsUseCase {
  return new RemoteGetAnimalsUseCase(
    'properties/:propertyId/animals',
    makeApiHttpClient<
      AnimalModel,
      AnimalSearchApiItem,
      SearchApiResponse<AnimalSearchApiItem>
    >()
  )
}
