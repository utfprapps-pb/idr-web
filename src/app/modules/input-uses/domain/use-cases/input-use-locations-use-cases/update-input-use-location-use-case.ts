import type { InputUseLocationDetailsModel } from '../../models/input-use-locations-model'
import type { RequestInterface, WithId } from '@/core/domain/types'

export type UpdateInputUseLocationUseCase = RequestInterface<
  {
    inputUseLocation: WithId<InputUseLocationDetailsModel>
  },
  void
>
