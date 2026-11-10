import type { AnimalPregnancyDiagnosisDetailsModel } from '../../models/animal-pregnancy-diagnoses-model'
import type { RequestInterface } from '@/core/domain/types'

export type CreateAnimalPregnancyDiagnosisUseCase = RequestInterface<
  {
    propertyId: string
    animalId: string
    animalPregnancyDiagnosis: AnimalPregnancyDiagnosisDetailsModel
  },
  void
>
