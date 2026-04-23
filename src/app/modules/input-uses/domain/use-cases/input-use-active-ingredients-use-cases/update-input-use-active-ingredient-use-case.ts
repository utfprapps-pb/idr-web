import type { InputUseActiveIngredientDetailsModel } from '../../models/input-use-active-ingredients-model'
import type { RequestInterface, WithId } from '@/core/domain/types'

export type UpdateInputUseActiveIngredientUseCase = RequestInterface<
  {
    inputUseActiveIngredient: WithId<InputUseActiveIngredientDetailsModel>
  },
  void
>
