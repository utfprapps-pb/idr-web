import type { RequestInterface } from '@/core/domain/types'

export type DeleteCultivationDiseaseUseCase = RequestInterface<
  {
    propertyId: number
    id: number
  },
  void
>
