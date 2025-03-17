import type { ImprovementDetailsModel } from '../models/improvements-model'
import type { RequestInterface } from '@/core/domain/types'

export type CreateImprovementUseCase = RequestInterface<
  { propertyId: string; improvement: ImprovementDetailsModel },
  void
>
