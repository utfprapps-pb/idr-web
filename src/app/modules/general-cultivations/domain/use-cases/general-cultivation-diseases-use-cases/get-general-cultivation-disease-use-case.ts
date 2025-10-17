import type { GeneralCultivationDiseaseDetailsModel } from '../../models/general-cultivation-diseases-model'
import type { RequestInterface } from '@/core/domain/types'

export type GetGeneralCultivationDiseaseUseCase = RequestInterface<
  {
    id: number
  },
  GeneralCultivationDiseaseDetailsModel
>
