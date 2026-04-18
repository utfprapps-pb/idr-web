import type { InputUseProductDetailsModel } from '../../models/input-use-products-model'
import type { RequestInterface } from '@/core/domain/types'

export type CreateInputUseProductUseCase = RequestInterface<
  {
    inputUseProduct: InputUseProductDetailsModel
  },
  void
>
