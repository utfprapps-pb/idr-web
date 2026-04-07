import type { InputUseLocationDetailsModel } from '../../models/input-use-locations-model'
import type { RequestInterface } from '@/core/domain/types'

export type GetInputUseLocationUseCase = RequestInterface<
  {
    id: number
  },
  InputUseLocationDetailsModel
>
