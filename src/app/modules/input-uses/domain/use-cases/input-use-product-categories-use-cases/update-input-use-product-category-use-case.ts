import type { InputUseProductCategoryDetailsModel } from '../../models/input-use-product-categories-model'
import type { RequestInterface, WithId } from '@/core/domain/types'

export type UpdateInputUseProductCategoryUseCase = RequestInterface<
  {
    inputUseProductCategory: WithId<InputUseProductCategoryDetailsModel>
  },
  void
>
