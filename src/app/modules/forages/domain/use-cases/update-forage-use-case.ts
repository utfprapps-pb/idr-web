import type { ForageDetailsModel } from '../models/forages-model'
import type { RequestInterface } from '@/core/domain/types'
import type { WithId } from '@/core/domain/types/with-id-type'

export type UpdateForageUseCase = RequestInterface<
  {
    propertyId: number
    forage: WithId<ForageDetailsModel>
  },
  void
>
