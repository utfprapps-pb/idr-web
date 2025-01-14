import type { ImprovementDetailsModel } from '@/domain/models/improvementModel'
import type { IRequestInterface } from '@/domain/shared/types'
import type { WithId } from '@/domain/shared/types/withId'

export type IUpdateImprovement = IRequestInterface<
  {
    propertyId: string
    forage: WithId<ImprovementDetailsModel>
  },
  void
>
