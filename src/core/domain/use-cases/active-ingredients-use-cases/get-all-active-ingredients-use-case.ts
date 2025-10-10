import type { ActiveIngredientModel } from '../../models/active-ingredients-model'
import type {
  RequestInterface,
  ListParams,
  ListResponse,
} from '@/core/domain/types'

export type GetAllActiveIngredientsUseCase = RequestInterface<
  ListParams<ActiveIngredientModel>,
  ListResponse<ActiveIngredientModel>
>
