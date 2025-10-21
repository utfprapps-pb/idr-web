import type { NutritionalBalancingDetailsModel } from '../models/nutritional-balancings-model'
import type { RequestInterface } from '@/core/domain/types'

export type GetNutritionalBalancingUseCase = RequestInterface<
  {
    propertyId: number
    nutritionalBalancingId: number
  },
  NutritionalBalancingDetailsModel
>
