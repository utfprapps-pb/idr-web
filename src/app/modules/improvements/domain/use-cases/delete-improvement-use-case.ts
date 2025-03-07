import type { RequestInterface } from '@/core/domain/types'

export type DeleteImprovementUseCase = RequestInterface<
  {
    propertyId: string
    improvementId: string
  },
  void
>
