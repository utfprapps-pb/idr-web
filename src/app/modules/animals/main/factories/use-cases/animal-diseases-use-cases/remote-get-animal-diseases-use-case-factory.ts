import { makeApiHttpClient } from '@/core/main/factories/http'

import {
  RemoteGetAnimalDiseasesUseCase,
  type AnimalDiseaseSearchApiItem,
  type AnimalDiseaseSearchApiResponse,
} from '../../../../data/use-cases/animal-diseases-use-cases/remote-get-animal-diseases-use-case'

import type { AnimalDiseaseModel } from '../../../../domain/models/animal-diseases-model'
import type { GetAnimalDiseasesUseCase } from '../../../../domain/use-cases/animal-diseases-use-cases'

export function makeRemoteGetAnimalDiseasesUseCase(): GetAnimalDiseasesUseCase {
  return new RemoteGetAnimalDiseasesUseCase(
    'properties/:propertyId/animals/:animalId/diseases',
    makeApiHttpClient<
      AnimalDiseaseModel,
      AnimalDiseaseSearchApiItem,
      AnimalDiseaseSearchApiResponse
    >()
  )
}
