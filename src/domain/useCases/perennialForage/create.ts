import type { PerennialForageDetailsModel } from '@/domain/models/perennialForageModel'
import type { IRequestInterface } from '@/domain/shared/types'

export type ICreatePerennialForage = IRequestInterface<
  { propertyId: string; perennialForage: PerennialForageDetailsModel },
  void
>
