import { RemoteGetAnimalPregnancyDiagnosesUseCase } from '@/app/modules/animals/data/use-cases/animal-pregnancy-diagnoses-use-cases/remote-get-animal-pregnancy-diagnoses-use-case'
import { makeApiHttpClient } from '@/core/main/factories/http'

import type {
  AnimalPregnancyDiagnosisApiResponse,
  AnimalPregnancyDiagnosisModel,
} from '../../../../domain/models/animal-pregnancy-diagnoses-model'
import type { GetAnimalPregnancyDiagnosesUseCase } from '@/app/modules/animals/domain/use-cases/animal-pregnancy-diagnoses-use-cases'
import type { SearchApiResponse } from '@/core/domain/types'

export function makeRemoteGetAnimalPregnancyDiagnosesUseCase(): GetAnimalPregnancyDiagnosesUseCase {
  return new RemoteGetAnimalPregnancyDiagnosesUseCase(
    'properties/:propertyId/animals/:animalId/pregnancy-diagnoses',
    makeApiHttpClient<
      AnimalPregnancyDiagnosisModel,
      AnimalPregnancyDiagnosisApiResponse,
      SearchApiResponse<AnimalPregnancyDiagnosisApiResponse>
    >()
  )
}
