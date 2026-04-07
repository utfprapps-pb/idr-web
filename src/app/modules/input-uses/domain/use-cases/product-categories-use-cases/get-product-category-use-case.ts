import type { ProductCategoryDetailsModel } from '../../models/product-categories-model'
import type { RequestInterface } from '@/core/domain/types'

export type GetProductCategoryUseCase = RequestInterface<
  {
    id: number
  },
  ProductCategoryDetailsModel
>
