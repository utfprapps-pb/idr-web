import type { CultivationDiseaseModel } from '../../models/cultivation-diseases-model'
import type {
  RequestInterface,
  ListParams,
  ListResponse,
} from '@/core/domain/types'

export type GetCultivationDiseasesUseCase = RequestInterface<
  ListParams<CultivationDiseaseModel> & {
    propertyId: number
  },
  ListResponse<CultivationDiseaseModel>
>
