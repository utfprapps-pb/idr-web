import type { RequestInterface } from '@/core/domain/types'

export type DeleteGeneralCultivationPestUseCase = RequestInterface<
  {
    id: number
  },
  void
>
