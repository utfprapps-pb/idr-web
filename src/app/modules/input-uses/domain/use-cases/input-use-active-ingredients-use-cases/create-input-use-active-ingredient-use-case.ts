import type { InputUseActiveIngredientDetailsModel } from '../../models/input-use-active-ingredients-model'
import type { RequestInterface } from '@/core/domain/types'

export type CreateInputUseActiveIngredientUseCase = RequestInterface<
  {
    inputUseActiveIngredient: InputUseActiveIngredientDetailsModel
  },
  void
>
