import type { GeneralCultivationDetailsModel } from '../../models/general-cultivations-model'
import type { RequestInterface } from '@/core/domain/types'
import type { WithId } from '@/core/domain/types/with-id-type'

export type UpdateGeneralCultivationUseCase = RequestInterface<
  {
    generalCultivation: WithId<GeneralCultivationDetailsModel>
  },
  void
>
