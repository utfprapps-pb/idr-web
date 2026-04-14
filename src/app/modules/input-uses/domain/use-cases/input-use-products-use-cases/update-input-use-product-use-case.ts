import type { InputUseProductDetailsModel } from '../../models/input-use-products-model'
import type { RequestInterface, WithId } from '@/core/domain/types'

export type UpdateInputUseProductUseCase = RequestInterface<
  {
    inputUseProduct: WithId<InputUseProductDetailsModel>
  },
  void
>
