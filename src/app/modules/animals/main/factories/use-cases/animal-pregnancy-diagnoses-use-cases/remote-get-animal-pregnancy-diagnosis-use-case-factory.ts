import { RemoteGetAnimalPregnancyDiagnosisUseCase } from '@/app/modules/animals/data/use-cases/animal-pregnancy-diagnoses-use-cases'
import { makeApiHttpClient } from '@/core/main/factories/http'

import type {
  AnimalPregnancyDiagnosisDetailsApiResponse,
  AnimalPregnancyDiagnosisDetailsModel,
} from '@/app/modules/animals/domain/models/animal-pregnancy-diagnoses-model'
import type { GetAnimalPregnancyDiagnosisUseCase } from '@/app/modules/animals/domain/use-cases/animal-pregnancy-diagnoses-use-cases'

export function makeRemoteGetAnimalPregnancyDiagnosisUseCase(): GetAnimalPregnancyDiagnosisUseCase {
  return new RemoteGetAnimalPregnancyDiagnosisUseCase(
    'properties/:propertyId/animals/:animalId/pregnancy-diagnoses',
    makeApiHttpClient<
      AnimalPregnancyDiagnosisDetailsModel,
      AnimalPregnancyDiagnosisDetailsApiResponse
    >()
  )
}
