import type { IRequestInterface } from '@/domain/shared/types'

export type IDeletePerennialForage = IRequestInterface<
  {
    propertyId: string
    perennialForageId: string
  },
  void
>
