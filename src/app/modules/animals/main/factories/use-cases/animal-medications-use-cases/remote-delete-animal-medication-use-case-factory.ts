import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteDeleteAnimalMedicationUseCase } from '../../../../data/use-cases/animal-medications-use-cases'

import type { DeleteAnimalMedicationUseCase } from '../../../../domain/use-cases/animal-medications-use-cases'

export function makeRemoteDeleteAnimalMedicationUseCase(): DeleteAnimalMedicationUseCase {
  return new RemoteDeleteAnimalMedicationUseCase(
    'properties/:propertyId/animals/:animalId/medications',
    makeApiHttpClient()
  )
}
