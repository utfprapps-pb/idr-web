import type { ProductModel } from '../../models/products-model'
import type {
  RequestInterface,
  ListParams,
  ListResponse,
} from '@/core/domain/types'

export type GetAllProductsUseCase = RequestInterface<
  ListParams<ProductModel>,
  ListResponse<ProductModel>
>
