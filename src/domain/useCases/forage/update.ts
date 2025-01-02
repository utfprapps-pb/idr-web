import type { ForageDetailsModel } from '@/domain/models/forageModel'
import type { IRequestInterface } from '@/domain/shared/types'
import type { WithId } from '@/domain/shared/types/withId'

export type IUpdateForage = IRequestInterface<
  {
    propertyId: string
    forage: WithId<ForageDetailsModel>
  },
  void
>
