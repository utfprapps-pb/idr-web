import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteUpdateAnimalMedicationUseCase } from '../../../../data/use-cases/animal-medications-use-cases'

import type { UpdateAnimalMedicationUseCase } from '../../../../domain/use-cases/animal-medications-use-cases'

export function makeRemoteUpdateAnimalMedicationUseCase(): UpdateAnimalMedicationUseCase {
  return new RemoteUpdateAnimalMedicationUseCase(
    'properties/:propertyId/animals/:animalId/medications',
    makeApiHttpClient()
  )
}
