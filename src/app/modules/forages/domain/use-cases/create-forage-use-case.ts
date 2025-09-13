import type { ForageDetailsModel } from '../models/forages-model'
import type { RequestInterface } from '@/core/domain/types'

export type CreateForageUseCase = RequestInterface<
  { propertyId: number; forage: ForageDetailsModel },
  void
>
