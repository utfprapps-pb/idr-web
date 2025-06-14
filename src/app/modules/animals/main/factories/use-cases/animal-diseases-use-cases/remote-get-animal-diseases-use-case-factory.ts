import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteGetAnimalDiseasesUseCase } from '../../../../data/use-cases/animal-diseases-use-cases'

import type {
  AnimalDiseaseApiResponse,
  AnimalDiseaseModel,
} from '../../../../domain/models/animal-diseases-model'
import type { GetAnimalDiseasesUseCase } from '../../../../domain/use-cases/animal-diseases-use-cases'
import type { ListApiResponse } from '@/core/domain/types'

export function makeRemoteGetAnimalDiseasesUseCase(): GetAnimalDiseasesUseCase {
  return new RemoteGetAnimalDiseasesUseCase(
    'properties/:propertyId/animals/:animalId/diseases',
    makeApiHttpClient<
      AnimalDiseaseModel,
      AnimalDiseaseApiResponse,
      ListApiResponse<AnimalDiseaseModel[]>
    >()
  )
}
