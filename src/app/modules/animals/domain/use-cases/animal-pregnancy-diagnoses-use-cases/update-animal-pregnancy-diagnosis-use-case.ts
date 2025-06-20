import type { AnimalPregnancyDiagnosisDetailsModel } from '../../models/animal-pregnancy-diagnoses-model'
import type { RequestInterface } from '@/core/domain/types'
import type { WithId } from '@/core/domain/types/with-id-type'

export type UpdateAnimalPregnancyDiagnosisUseCase = RequestInterface<
  {
    propertyId: string
    animalId: string
    animalPregnancyDiagnosis: WithId<AnimalPregnancyDiagnosisDetailsModel>
  },
  void
>
