import type { InputUseProductModel } from '../../models/input-use-products-model'
import type {
  ListParams,
  ListResponse,
  RequestInterface,
} from '@/core/domain/types'

export type GetInputUseProductsUseCase = RequestInterface<
  ListParams<InputUseProductModel>,
  ListResponse<InputUseProductModel>
>
