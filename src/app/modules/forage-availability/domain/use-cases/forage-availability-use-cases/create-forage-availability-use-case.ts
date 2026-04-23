import type { ForageAvailabilityDetailsModel } from '../../models/forage-availability-model'
import type { RequestInterface } from '@/core/domain/types'

export type CreateForageAvailabilityUseCase = RequestInterface<
  {
    propertyId: number
    forageAvailability: ForageAvailabilityDetailsModel
  },
  void
>
