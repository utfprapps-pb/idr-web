import type { CultivationPestModel } from '../../models/cultivation-pests-model'
import type {
  RequestInterface,
  ListParams,
  ListResponse,
} from '@/core/domain/types'

export type GetCultivationPestsUseCase = RequestInterface<
  ListParams<CultivationPestModel> & {
    propertyId: number
  },
  ListResponse<CultivationPestModel>
>
