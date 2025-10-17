import type { GeneralCultivationPestDetailsModel } from '../../models/general-cultivation-pests-model'
import type { RequestInterface } from '@/core/domain/types'
import type { WithId } from '@/core/domain/types/with-id-type'

export type UpdateGeneralCultivationPestUseCase = RequestInterface<
  {
    generalCultivationPest: WithId<GeneralCultivationPestDetailsModel>
  },
  void
>
