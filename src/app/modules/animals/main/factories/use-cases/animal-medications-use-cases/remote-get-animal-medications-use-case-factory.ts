import { makeApiHttpClient } from '@/core/main/factories/http'

import {
  RemoteGetAnimalMedicationsUseCase,
  type AnimalMedicationSearchApiItem,
  type AnimalMedicationSearchApiResponse,
} from '../../../../data/use-cases/animal-medications-use-cases/remote-get-animal-medications-use-case'
import { type AnimalMedicationModel } from '../../../../domain/models/animal-medications-model'

import type { GetAnimalMedicationsUseCase } from '../../../../domain/use-cases/animal-medications-use-cases'

export function makeRemoteGetAnimalMedicationsUseCase(): GetAnimalMedicationsUseCase {
  return new RemoteGetAnimalMedicationsUseCase(
    'properties/:propertyId/animals/:animalId/medications',
    makeApiHttpClient<
      AnimalMedicationModel,
      AnimalMedicationSearchApiItem,
      AnimalMedicationSearchApiResponse
    >()
  )
}
