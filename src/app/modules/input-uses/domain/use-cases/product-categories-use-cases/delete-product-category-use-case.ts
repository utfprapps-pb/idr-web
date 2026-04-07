import type { RequestInterface } from '@/core/domain/types'

export type DeleteProductCategoryUseCase = RequestInterface<
  {
    id: number
  },
  void
>
