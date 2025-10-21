import type { NutritionalBalancingModel } from '../models/nutritional-balancings-model'
import type {
  RequestInterface,
  ListParams,
  ListResponse,
} from '@/core/domain/types'

export type GetNutritionalBalancingsUseCase = RequestInterface<
  ListParams<NutritionalBalancingModel> & { propertyId: number },
  ListResponse<NutritionalBalancingModel>
>
