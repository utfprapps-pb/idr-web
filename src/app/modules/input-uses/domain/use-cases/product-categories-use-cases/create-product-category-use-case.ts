import type { ProductCategoryDetailsModel } from '../../models/product-categories-model'
import type { RequestInterface } from '@/core/domain/types'

export type CreateProductCategoryUseCase = RequestInterface<
  {
    productCategory: ProductCategoryDetailsModel
  },
  void
>
