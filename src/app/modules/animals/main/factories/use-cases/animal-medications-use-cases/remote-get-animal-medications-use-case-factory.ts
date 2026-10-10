import { makeApiHttpClient } from '@/core/main/factories/http'

import {
  RemoteGetAnimalMedicationsUseCase,
  type AnimalMedicationSearchApiItem,
} from '../../../../data/use-cases/animal-medications-use-cases/remote-get-animal-medications-use-case'
import { type AnimalMedicationModel } from '../../../../domain/models/animal-medications-model'

import type { GetAnimalMedicationsUseCase } from '../../../../domain/use-cases/animal-medications-use-cases'
import type { SearchApiResponse } from '@/core/domain/types'

export function makeRemoteGetAnimalMedicationsUseCase(): GetAnimalMedicationsUseCase {
  return new RemoteGetAnimalMedicationsUseCase(
    'properties/:propertyId/animals/:animalId/medications',
    makeApiHttpClient<
      AnimalMedicationModel,
      AnimalMedicationSearchApiItem,
      SearchApiResponse<AnimalMedicationSearchApiItem>
    >()
  )
}
