import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteUpdateAnimalDiseaseUseCase } from '../../../../data/use-cases/animal-diseases-use-cases'

import type { UpdateAnimalDiseaseUseCase } from '../../../../domain/use-cases/animal-diseases-use-cases'

export function makeRemoteUpdateAnimalDiseaseUseCase(): UpdateAnimalDiseaseUseCase {
  return new RemoteUpdateAnimalDiseaseUseCase(
    'properties/:propertyId/animals/:animalId/diseases',
    makeApiHttpClient<void>()
  )
}
