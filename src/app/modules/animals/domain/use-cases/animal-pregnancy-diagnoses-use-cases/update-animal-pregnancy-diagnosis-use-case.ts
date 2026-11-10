import type { AnimalPregnancyDiagnosisDetailsModel } from '../../models/animal-pregnancy-diagnoses-model'
import type { RequestInterface } from '@/core/domain/types'

export type UpdateAnimalPregnancyDiagnosisUseCase = RequestInterface<
  {
    propertyId: string
    animalId: string
    animalPregnancyDiagnosis: {
      id: string
    } & AnimalPregnancyDiagnosisDetailsModel
  },
  void
>
