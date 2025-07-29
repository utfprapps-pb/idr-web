import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteDeleteAnimalDiseaseUseCase } from '../../../../data/use-cases/animal-diseases-use-cases'

import type { DeleteAnimalDiseaseUseCase } from '../../../../domain/use-cases/animal-diseases-use-cases'

export function makeRemoteDeleteAnimalDiseaseUseCase(): DeleteAnimalDiseaseUseCase {
  return new RemoteDeleteAnimalDiseaseUseCase(
    'properties/:propertyId/animals/:animalId/diseases',
    makeApiHttpClient<void>()
  )
}
