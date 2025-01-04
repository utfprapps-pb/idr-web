import type { IRequestInterface } from '@/domain/shared/types'

export type IDeleteForage = IRequestInterface<
  {
    propertyId: string
    forageId: string
  },
  void
>
