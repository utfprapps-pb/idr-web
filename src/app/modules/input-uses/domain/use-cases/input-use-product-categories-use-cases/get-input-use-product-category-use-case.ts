import type { InputUseProductCategoryDetailsModel } from '../../models/input-use-product-categories-model'
import type { RequestInterface } from '@/core/domain/types'

export type GetInputUseProductCategoryUseCase = RequestInterface<
  {
    id: number
  },
  InputUseProductCategoryDetailsModel
>
