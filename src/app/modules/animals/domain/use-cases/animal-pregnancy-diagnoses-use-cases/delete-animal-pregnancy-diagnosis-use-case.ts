import type { RequestInterface } from '@/core/domain/types'

export type DeleteAnimalPregnancyDiagnosisUseCase = RequestInterface<
  {
    propertyId: string
    animalId: string
    id: string
  },
  void
>
