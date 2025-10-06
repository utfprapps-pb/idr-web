import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteCreateAnimalMedicationUseCase } from '../../../../data/use-cases/animal-medications-use-cases'

import type { CreateAnimalMedicationUseCase } from '../../../../domain/use-cases/animal-medications-use-cases'

export function makeRemoteCreateAnimalMedicationUseCase(): CreateAnimalMedicationUseCase {
  return new RemoteCreateAnimalMedicationUseCase(
    'properties/:propertyId/animals/:animalId/medications',
    makeApiHttpClient()
  )
}
