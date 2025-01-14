import type { ImprovementDetailsModel } from '@/domain/models/improvementModel'
import type { IRequestInterface } from '@/domain/shared/types'

export type ICreateImprovement = IRequestInterface<
  { propertyId: string; improvement: ImprovementDetailsModel },
  void
>
