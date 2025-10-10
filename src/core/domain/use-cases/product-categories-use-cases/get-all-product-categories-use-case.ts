import type { ProductCategoryModel } from '../../models/product-categories-model'
import type {
  RequestInterface,
  ListParams,
  ListResponse,
} from '@/core/domain/types'

export type GetAllProductCategoriesUseCase = RequestInterface<
  ListParams<ProductCategoryModel>,
  ListResponse<ProductCategoryModel>
>
