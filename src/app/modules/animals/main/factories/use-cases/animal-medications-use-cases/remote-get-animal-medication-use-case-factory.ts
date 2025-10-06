import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteGetAnimalMedicationUseCase } from '../../../../data/use-cases/animal-medications-use-cases'

import type {
  AnimalMedicationDetailsApiResponse,
  AnimalMedicationDetailsModel,
} from '../../../../domain/models/animal-medications-model'
import type { GetAnimalMedicationUseCase } from '../../../../domain/use-cases/animal-medications-use-cases'

export function makeRemoteGetAnimalMedicationUseCase(): GetAnimalMedicationUseCase {
  return new RemoteGetAnimalMedicationUseCase(
    'properties/:propertyId/animals/:animalId/medications',
    makeApiHttpClient<
      AnimalMedicationDetailsModel,
      AnimalMedicationDetailsApiResponse
    >()
  )
}
