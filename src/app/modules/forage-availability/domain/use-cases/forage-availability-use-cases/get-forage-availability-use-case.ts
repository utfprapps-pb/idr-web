import { type RequestInterface } from '@/core/domain/types'

import { type ForageAvailabilityDetailsModel } from '../../models/forage-availability-model'

export type GetForageAvailabilityUseCase = RequestInterface<
  {
    propertyId: number
    id: number
  },
  ForageAvailabilityDetailsModel
>
