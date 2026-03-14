import type { NutritionalBalancingDetailsModel } from '../models/nutritional-balancings-model'
import type { RequestInterface } from '@/core/domain/types'

export type CreateNutritionalBalancingUseCase = RequestInterface<
  {
    propertyId: number
    nutritionalBalancings: NutritionalBalancingDetailsModel[]
  },
  void
>
