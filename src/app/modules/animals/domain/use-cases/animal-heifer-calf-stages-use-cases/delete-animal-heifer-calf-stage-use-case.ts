import type { RequestInterface } from '@/core/domain/types'

export type DeleteAnimalHeiferCalfStageUseCase = RequestInterface<
  {
    propertyId: string
    animalId: string
    id: string
  },
  void
>
