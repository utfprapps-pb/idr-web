import type { CultivationPestDetailsModel } from '../../models/cultivation-pests-model'
import type { RequestInterface } from '@/core/domain/types'

export type CreateCultivationPestUseCase = RequestInterface<
  {
    propertyId: number
    cultivationPest: CultivationPestDetailsModel
  },
  void
>
