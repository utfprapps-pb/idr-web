import type { ProductCategoryDetailsModel } from '../../models/product-categories-model'
import type { RequestInterface, WithId } from '@/core/domain/types'

export type UpdateProductCategoryUseCase = RequestInterface<
  {
    productCategory: WithId<ProductCategoryDetailsModel>
  },
  void
>
