import type { RequestInterface } from '@/core/domain/types'

export type DeleteInputUseActiveIngredientUseCase = RequestInterface<
  {
    id: number
  },
  void
>
