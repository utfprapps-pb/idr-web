import type { RequestInterface } from '@/core/domain/types'

export type DeleteInputUseProductUseCase = RequestInterface<
  { id: number },
  void
>
