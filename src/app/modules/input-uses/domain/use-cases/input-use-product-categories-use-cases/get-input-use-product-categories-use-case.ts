import type { InputUseProductCategoryModel } from '../../models/input-use-product-categories-model'
import type {
  RequestInterface,
  ListParams,
  ListResponse,
} from '@/core/domain/types'

export type GetInputUseProductCategoriesUseCase = RequestInterface<
  ListParams<InputUseProductCategoryModel>,
  ListResponse<InputUseProductCategoryModel>
>
