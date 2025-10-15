import type { VegetableDiseaseModel } from '../../models/vegetable-diseases-model'
import type {
  RequestInterface,
  ListParams,
  ListResponse,
} from '@/core/domain/types'

export type GetVegetableDiseasesUseCase = RequestInterface<
  ListParams<VegetableDiseaseModel> & {
    propertyId: number
  },
  ListResponse<VegetableDiseaseModel>
>
