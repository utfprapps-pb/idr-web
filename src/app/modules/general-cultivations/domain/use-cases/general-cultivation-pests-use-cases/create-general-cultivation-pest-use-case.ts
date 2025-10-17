import type { GeneralCultivationPestDetailsModel } from '../../models/general-cultivation-pests-model'
import type { RequestInterface } from '@/core/domain/types'

export type CreateGeneralCultivationPestUseCase = RequestInterface<
  {
    generalCultivationPest: GeneralCultivationPestDetailsModel
  },
  void
>
