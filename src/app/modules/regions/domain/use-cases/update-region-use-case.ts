import type { RequestInterface } from '@/core/domain/types'

export type UpdateRegionUseCase = RequestInterface<
  { id: string; name: string },
  void
>
