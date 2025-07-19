import type { AnimalPregnancyDiagnosisDetailsModel } from '../../models/animal-pregnancy-diagnoses-model'
import type { RequestInterface } from '@/core/domain/types'

export type GetAnimalPregnancyDiagnosisUseCase = RequestInterface<
  {
    propertyId: number
    animalId: number
    id: number
  },
  AnimalPregnancyDiagnosisDetailsModel
>
