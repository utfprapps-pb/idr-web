import type { ForageDetailsModel } from '../models/forages-model'
import type { RequestInterface } from '@/core/domain/types'
import type { WithId } from '@/core/domain/types/with-id-type'

export type UpdateForageUseCase = RequestInterface<
  {
    propertyId: string
    forage: WithId<ForageDetailsModel>
  },
  void
>
