import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteGetAnimalUseCase } from '../../../data/use-cases'

import type { AnimalDetailsModel } from '../../../domain/models/animals-model'
import type { GetAnimalUseCase } from '../../../domain/use-cases'

export function makeRemoteGetAnimalUseCase(): GetAnimalUseCase {
  return new RemoteGetAnimalUseCase(
    'properties/:propertyId/animals',
    makeApiHttpClient<AnimalDetailsModel>()
  )
}
