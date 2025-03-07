import type { ImprovementDetailsModel } from '../models/improvements-model'
import type { RequestInterface } from '@/core/domain/types'

export type GetImprovementUseCase = RequestInterface<
  {
    propertyId: string
    improvementId: string
  },
  ImprovementDetailsModel
>
