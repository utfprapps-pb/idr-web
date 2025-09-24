import type { AnimalPurchaseModel } from '../../models/animal-purchases-model'
import type {
  RequestInterface,
  ListParams,
  ListResponse,
} from '@/core/domain/types'

export type GetAnimalPurchasesUseCase = RequestInterface<
  ListParams<AnimalPurchaseModel> & {
    propertyId: number
    animalId: number
  },
  ListResponse<AnimalPurchaseModel>
>
