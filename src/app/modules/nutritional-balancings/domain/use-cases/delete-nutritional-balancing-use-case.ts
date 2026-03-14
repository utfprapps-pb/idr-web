import type { RequestInterface } from '@/core/domain/types'

export type DeleteNutritionalBalancingUseCase = RequestInterface<
  {
    propertyId: number
    nutritionalBalancingId: number
  },
  void
>
