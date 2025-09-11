import { RemoteCreateAnimalPregnancyDiagnosisUseCase } from '@/app/modules/animals/data/use-cases/animal-pregnancy-diagnoses-use-cases'
import { makeApiHttpClient } from '@/core/main/factories/http'

import type { CreateAnimalPregnancyDiagnosisUseCase } from '@/app/modules/animals/domain/use-cases/animal-pregnancy-diagnoses-use-cases'

export function makeRemoteCreateAnimalPregnancyDiagnosisUseCase(): CreateAnimalPregnancyDiagnosisUseCase {
  return new RemoteCreateAnimalPregnancyDiagnosisUseCase(
    'properties/:propertyId/animals/:animalId/pregnancy-diagnoses',
    makeApiHttpClient()
  )
}
