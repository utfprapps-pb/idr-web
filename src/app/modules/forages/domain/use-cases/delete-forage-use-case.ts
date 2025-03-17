import type { RequestInterface } from '@/core/domain/types'

export type DeleteForageUseCase = RequestInterface<
  {
    propertyId: string
    forageId: string
  },
  void
>
