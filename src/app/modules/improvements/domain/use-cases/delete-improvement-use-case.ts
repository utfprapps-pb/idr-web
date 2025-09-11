import type { RequestInterface } from '@/core/domain/types'

export type DeleteImprovementUseCase = RequestInterface<
  {
    propertyId: number
    improvementId: number
  },
  void
>
