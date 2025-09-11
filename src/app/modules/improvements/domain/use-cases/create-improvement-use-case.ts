import type { ImprovementDetailsModel } from '../models/improvements-model'
import type { RequestInterface } from '@/core/domain/types'

export type CreateImprovementUseCase = RequestInterface<
  { propertyId: number; improvement: ImprovementDetailsModel },
  void
>
