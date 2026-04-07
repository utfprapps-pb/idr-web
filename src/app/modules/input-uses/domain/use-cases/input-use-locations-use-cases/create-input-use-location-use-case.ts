import type { InputUseLocationDetailsModel } from '../../models/input-use-locations-model'
import type { RequestInterface } from '@/core/domain/types'

export type CreateInputUseLocationUseCase = RequestInterface<
  {
    inputUseLocation: InputUseLocationDetailsModel
  },
  void
>
