import type { RequestInterface } from '@/core/domain/types'

export type DeleteInputUseProductCategoryUseCase = RequestInterface<
  {
    id: number
  },
  void
>
