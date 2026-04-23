import { type RequestInterface } from '@/core/domain/types'

export type DeleteForageAvailabilityUseCase = RequestInterface<
  {
    propertyId: number
    id: number
  },
  void
>
