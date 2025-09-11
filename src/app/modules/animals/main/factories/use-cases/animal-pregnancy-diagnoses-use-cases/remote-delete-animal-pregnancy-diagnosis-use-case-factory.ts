import { RemoteDeleteAnimalPregnancyDiagnosisUseCase } from '@/app/modules/animals/data/use-cases/animal-pregnancy-diagnoses-use-cases'
import { makeApiHttpClient } from '@/core/main/factories/http'

import type { DeleteAnimalPregnancyDiagnosisUseCase } from '@/app/modules/animals/domain/use-cases/animal-pregnancy-diagnoses-use-cases'

export function makeRemoteDeleteAnimalPregnancyDiagnosisUseCase(): DeleteAnimalPregnancyDiagnosisUseCase {
  return new RemoteDeleteAnimalPregnancyDiagnosisUseCase(
    'properties/:propertyId/animals/:animalId/pregnancy-diagnoses',
    makeApiHttpClient()
  )
}
