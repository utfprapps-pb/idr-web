import type { RequestInterface } from '@/core/domain/types'

export type DeleteGeneralCultivationDiseaseUseCase = RequestInterface<
  {
    id: number
  },
  void
>
