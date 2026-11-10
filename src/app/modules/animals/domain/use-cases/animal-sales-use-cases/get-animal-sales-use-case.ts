import type { AnimalSaleModel } from '../../models/animal-sales-model'
import type {
  RequestInterface,
  ListParams,
  ListResponse,
} from '@/core/domain/types'

export type GetAnimalSalesUseCase = RequestInterface<
  ListParams<AnimalSaleModel> & {
    propertyId: string
    animalId: string
  },
  ListResponse<AnimalSaleModel>
>
