import type { RequestInterface } from '@/core/domain/types'

export type DeleteInputUseLocationUseCase = RequestInterface<
  {
    id: number
  },
  void
>
