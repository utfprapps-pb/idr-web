import type { ForageDetailsModel } from '@/domain/models/forageModel'
import type { IRequestInterface } from '@/domain/shared/types'

export type ICreateForage = IRequestInterface<
  { propertyId: string; forage: ForageDetailsModel },
  void
>
