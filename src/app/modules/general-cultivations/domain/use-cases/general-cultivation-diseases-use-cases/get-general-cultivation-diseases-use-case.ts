import type { GeneralCultivationDiseaseModel } from '../../models/general-cultivation-diseases-model'
import type {
  RequestInterface,
  ListParams,
  ListResponse,
} from '@/core/domain/types'

export type GetGeneralCultivationDiseasesUseCase = RequestInterface<
  ListParams<GeneralCultivationDiseaseModel>,
  ListResponse<GeneralCultivationDiseaseModel>
>
