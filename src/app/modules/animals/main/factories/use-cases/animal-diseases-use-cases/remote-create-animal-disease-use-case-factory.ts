import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteCreateAnimalDiseaseUseCase } from '../../../../data/use-cases/animal-diseases-use-cases'

import type { CreateAnimalDiseaseUseCase } from '../../../../domain/use-cases/animal-diseases-use-cases'

export function makeRemoteCreateAnimalDiseaseUseCase(): CreateAnimalDiseaseUseCase {
  return new RemoteCreateAnimalDiseaseUseCase(
    'properties/:propertyId/animals/:animalId/diseases',
    makeApiHttpClient<void>()
  )
}
