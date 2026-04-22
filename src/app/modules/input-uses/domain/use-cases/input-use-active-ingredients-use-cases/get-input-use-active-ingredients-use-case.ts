import type { InputUseActiveIngredientModel } from '../../models/input-use-active-ingredients-model'
import type {
  RequestInterface,
  ListParams,
  ListResponse,
} from '@/core/domain/types'

export type GetInputUseActiveIngredientsUseCase = RequestInterface<
  ListParams<InputUseActiveIngredientModel>,
  ListResponse<InputUseActiveIngredientModel>
>
