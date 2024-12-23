import type { PerennialForageDetailsModel } from '@/domain/models/perennialForageModel'
import type { IRequestInterface } from '@/domain/shared/types'

export type IGetPerennialForage = IRequestInterface<
  {
    propertyId: string
    perennialForageId: string
  },
  PerennialForageDetailsModel
>
