import type { RequestInterface } from '@/core/domain/types'

export type DeleteCultivationPestUseCase = RequestInterface<
  {
    propertyId: number
    id: number
  },
  void
>
