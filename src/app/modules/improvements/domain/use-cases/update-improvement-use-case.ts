import type { ImprovementDetailsModel } from '../models/improvements-model'
import type { RequestInterface, WithId } from '@/core/domain/types'

export type UpdateImprovementUseCase = RequestInterface<
  {
    propertyId: string
    improvement: WithId<ImprovementDetailsModel>
  },
  void
>
