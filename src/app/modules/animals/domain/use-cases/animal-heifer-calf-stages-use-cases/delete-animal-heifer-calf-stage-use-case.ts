import type { RequestInterface } from '@/core/domain/types'

export type DeleteAnimalHeiferCalfStageUseCase = RequestInterface<
  {
    propertyId: number
    animalId: number
    id: number
  },
  void
>
