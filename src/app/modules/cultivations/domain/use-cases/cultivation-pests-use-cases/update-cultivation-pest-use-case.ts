import type { CultivationPestDetailsModel } from '../../models/cultivation-pests-model'
import type { RequestInterface } from '@/core/domain/types'
import type { WithId } from '@/core/domain/types/with-id-type'

export type UpdateCultivationPestUseCase = RequestInterface<
  {
    propertyId: number
    cultivationPest: WithId<CultivationPestDetailsModel>
  },
  void
>
