import type { GeneralCultivationPestDetailsModel } from '../../models/general-cultivation-pests-model'
import type { RequestInterface } from '@/core/domain/types'

export type GetGeneralCultivationPestUseCase = RequestInterface<
  {
    id: number
  },
  GeneralCultivationPestDetailsModel
>
