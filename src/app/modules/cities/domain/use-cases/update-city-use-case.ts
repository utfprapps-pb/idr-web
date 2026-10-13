import type { RequestInterface } from '@/core/domain/types'

export type UpdateCityUseCase = RequestInterface<
  { id: string; name: string; regionId: string },
  void
>
