import type { RequestInterface } from '@/core/domain/types'

export type DeleteGeneralCultivationUseCase = RequestInterface<
  {
    id: number
  },
  void
>
