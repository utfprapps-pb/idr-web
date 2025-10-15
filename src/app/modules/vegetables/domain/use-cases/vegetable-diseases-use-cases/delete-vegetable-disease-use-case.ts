import type { RequestInterface } from '@/core/domain/types'

export type DeleteVegetableDiseaseUseCase = RequestInterface<
  {
    propertyId: number
    id: number
  },
  void
>
