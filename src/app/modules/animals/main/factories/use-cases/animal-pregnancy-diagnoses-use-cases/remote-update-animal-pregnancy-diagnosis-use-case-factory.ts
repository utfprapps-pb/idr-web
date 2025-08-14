import { RemoteUpdateAnimalPregnancyDiagnosisUseCase } from '@/app/modules/animals/data/use-cases/animal-pregnancy-diagnoses-use-cases'
import { makeApiHttpClient } from '@/core/main/factories/http'

import type { UpdateAnimalPregnancyDiagnosisUseCase } from '@/app/modules/animals/domain/use-cases/animal-pregnancy-diagnoses-use-cases'

export function makeRemoteUpdateAnimalPregnancyDiagnosisUseCase(): UpdateAnimalPregnancyDiagnosisUseCase {
  return new RemoteUpdateAnimalPregnancyDiagnosisUseCase(
    'properties/:propertyId/animals/:animalId/pregnancy-diagnoses',
    makeApiHttpClient()
  )
}
