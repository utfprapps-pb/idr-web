import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteGetAnimalUseCase } from '../../../data/use-cases/remote-get-animal-use-case'

import type {
  AnimalApiResponse,
  AnimalDetailsModel,
} from '../../../domain/models/animals-model'
import type { GetAnimalUseCase } from '../../../domain/use-cases'

export function makeRemoteGetAnimalUseCase(): GetAnimalUseCase {
  return new RemoteGetAnimalUseCase(
    'properties/:propertyId/animals',
    makeApiHttpClient<AnimalDetailsModel, AnimalApiResponse>()
  )
}
