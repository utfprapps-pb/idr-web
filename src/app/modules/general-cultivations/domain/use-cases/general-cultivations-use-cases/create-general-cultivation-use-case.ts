import type { GeneralCultivationDetailsModel } from '../../models/general-cultivations-model'
import type { RequestInterface } from '@/core/domain/types'

export type CreateGeneralCultivationUseCase = RequestInterface<
  {
    generalCultivation: GeneralCultivationDetailsModel
  },
  void
>
