import type { ForageDetailsModel } from '../models/forages-model'
import type { RequestInterface } from '@/core/domain/types'

export type GetForageUseCase = RequestInterface<
  {
    propertyId: number
    forageId: number
  },
  ForageDetailsModel
>
