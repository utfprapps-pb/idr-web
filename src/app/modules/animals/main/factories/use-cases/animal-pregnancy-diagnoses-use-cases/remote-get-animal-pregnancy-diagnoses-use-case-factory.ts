import {
  RemoteGetAnimalPregnancyDiagnosesUseCase,
  type AnimalPregnancyDiagnosisSearchApiItem,
  type AnimalPregnancyDiagnosisSearchApiResponse,
} from '@/app/modules/animals/data/use-cases/animal-pregnancy-diagnoses-use-cases/remote-get-animal-pregnancy-diagnoses-use-case'
import { makeApiHttpClient } from '@/core/main/factories/http'

import type { AnimalPregnancyDiagnosisModel } from '@/app/modules/animals/domain/models/animal-pregnancy-diagnoses-model'
import type { GetAnimalPregnancyDiagnosesUseCase } from '@/app/modules/animals/domain/use-cases/animal-pregnancy-diagnoses-use-cases'

export function makeRemoteGetAnimalPregnancyDiagnosesUseCase(): GetAnimalPregnancyDiagnosesUseCase {
  return new RemoteGetAnimalPregnancyDiagnosesUseCase(
    'properties/:propertyId/animals/:animalId/pregnancy-diagnoses',
    makeApiHttpClient<
      AnimalPregnancyDiagnosisModel,
      AnimalPregnancyDiagnosisSearchApiItem,
      AnimalPregnancyDiagnosisSearchApiResponse
    >()
  )
}
