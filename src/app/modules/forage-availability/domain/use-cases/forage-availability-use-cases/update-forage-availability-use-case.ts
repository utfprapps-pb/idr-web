import { type RequestInterface, type WithId } from '@/core/domain/types'

import { type ForageAvailabilityDetailsModel } from '../../models/forage-availability-model'

export type UpdateForageAvailabilityUseCase = RequestInterface<
  {
    propertyId: number
    forageAvailability: WithId<ForageAvailabilityDetailsModel>
  },
  void
>
