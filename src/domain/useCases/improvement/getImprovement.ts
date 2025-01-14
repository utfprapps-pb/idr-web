import type { ImprovementDetailsModel } from '@/domain/models/improvementModel'
import type { IRequestInterface } from '@/domain/shared/types'

export type IGetImprovement = IRequestInterface<
  {
    propertyId: string
    improvementId: string
  },
  ImprovementDetailsModel
>
