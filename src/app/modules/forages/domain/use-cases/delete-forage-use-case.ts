import type { RequestInterface } from '@/core/domain/types'

export type DeleteForageUseCase = RequestInterface<
  {
    propertyId: number
    forageId: number
  },
  void
>
