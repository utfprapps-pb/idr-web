import type { RequestInterface } from '@/core/domain/types'

export type DeleteAnimalDiseaseUseCase = RequestInterface<
  {
    propertyId: string
    animalId: string
    id: string
  },
  void
>
