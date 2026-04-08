import type { InputUseProductCategoryDetailsModel } from '../../models/input-use-product-categories-model'
import type { RequestInterface } from '@/core/domain/types'

export type CreateInputUseProductCategoryUseCase = RequestInterface<
  {
    inputUseProductCategory: InputUseProductCategoryDetailsModel
  },
  void
>
