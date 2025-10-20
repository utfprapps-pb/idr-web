import type { CultivationPestDetailsModel } from '../../models/cultivation-pests-model'
import type { RequestInterface } from '@/core/domain/types'

export type GetCultivationPestUseCase = RequestInterface<
  {
    propertyId: number
    id: number
  },
  CultivationPestDetailsModel
>
