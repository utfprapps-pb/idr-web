import type { RequestInterface } from '@/core/domain/types'

export type DeleteAnimalPregnancyDiagnosisUseCase = RequestInterface<
  {
    propertyId: number
    animalId: number
    id: number
  },
  void
>
