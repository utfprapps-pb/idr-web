import type { RequestInterface } from '@/core/domain/types'

export type DeleteAnimalDiseaseUseCase = RequestInterface<
  {
    propertyId: number
    animalId: number
    id: number
  },
  void
>
