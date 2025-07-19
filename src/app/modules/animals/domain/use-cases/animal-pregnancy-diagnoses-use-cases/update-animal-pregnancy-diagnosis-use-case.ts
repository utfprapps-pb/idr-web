import type { AnimalPregnancyDiagnosisDetailsModel } from '../../models/animal-pregnancy-diagnoses-model'
import type { RequestInterface } from '@/core/domain/types'
import type { WithId } from '@/core/domain/types/with-id-type'

export type UpdateAnimalPregnancyDiagnosisUseCase = RequestInterface<
  {
    propertyId: number
    animalId: number
    animalPregnancyDiagnosis: WithId<AnimalPregnancyDiagnosisDetailsModel>
  },
  void
>
