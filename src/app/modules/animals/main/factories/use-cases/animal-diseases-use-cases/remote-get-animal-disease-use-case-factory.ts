import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteGetAnimalDiseaseUseCase } from '../../../../data/use-cases/animal-diseases-use-cases'

import type { AnimalDiseaseDetailsModel } from '../../../../domain/models/animal-diseases-model'
import type { GetAnimalDiseaseUseCase } from '../../../../domain/use-cases/animal-diseases-use-cases'

export function makeRemoteGetAnimalDiseaseUseCase(): GetAnimalDiseaseUseCase {
  return new RemoteGetAnimalDiseaseUseCase(
    'properties/:propertyId/animals/:animalId/diseases',
    makeApiHttpClient<AnimalDiseaseDetailsModel>()
  )
}
