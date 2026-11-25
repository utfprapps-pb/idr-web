import type { ProductModel, ProductOption } from '../../models/products-model'
import type { RequestInterface, ListParams } from '@/core/domain/types'

export type GetAllProductsUseCase = RequestInterface<
  ListParams<ProductModel>,
  ProductOption[]
>
