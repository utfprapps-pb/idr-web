import type { NutritionalBalancingDetailsModel } from '../models/nutritional-balancings-model'
import type { RequestInterface, WithId } from '@/core/domain/types'

export type UpdateNutritionalBalancingUseCase = RequestInterface<
  {
    propertyId: number
    nutritionalBalancing: WithId<NutritionalBalancingDetailsModel>
  },
  void
>
