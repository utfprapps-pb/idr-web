import type { IRequestInterface } from '@/domain/shared/types'

export type IDeleteImprovement = IRequestInterface<
  {
    propertyId: string
    improvementId: string
  },
  void
>
