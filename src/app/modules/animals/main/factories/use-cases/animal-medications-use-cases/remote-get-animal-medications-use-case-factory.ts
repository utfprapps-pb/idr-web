import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteGetAnimalMedicationsUseCase } from '../../../../data/use-cases/animal-medications-use-cases'
import {
  type AnimalMedicationApiResponse,
  type AnimalMedicationModel,
} from '../../../../domain/models/animal-medications-model'

import type { GetAnimalMedicationsUseCase } from '../../../../domain/use-cases/animal-medications-use-cases'
import type { ListApiResponse } from '@/core/domain/types'

export function makeRemoteGetAnimalMedicationsUseCase(): GetAnimalMedicationsUseCase {
  return new RemoteGetAnimalMedicationsUseCase(
    'properties/:propertyId/animals/:animalId/medications',
    makeApiHttpClient<
      AnimalMedicationModel,
      AnimalMedicationApiResponse,
      ListApiResponse<AnimalMedicationModel[]>
    >()
  )
}
