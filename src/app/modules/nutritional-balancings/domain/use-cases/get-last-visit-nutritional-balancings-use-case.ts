import type { NutritionalBalancingDetailsModel } from '../models/nutritional-balancings-model'
import type { RequestInterface } from '@/core/domain/types'

export type GetLastVisitNutritionalBalancingsUseCase = RequestInterface<
  {
    propertyId: number
  },
  {
    visitId: number
    nutritionalBalancings: NutritionalBalancingDetailsModel[]
  } | null
>
