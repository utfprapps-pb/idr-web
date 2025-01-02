import type { ForageDetailsModel } from '@/domain/models/forageModel'
import type { IRequestInterface } from '@/domain/shared/types'

export type IGetForage = IRequestInterface<
  {
    propertyId: string
    forageId: string
  },
  ForageDetailsModel
>
