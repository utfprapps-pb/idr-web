import type { AnimalDeathModel } from '../../models/animal-deaths-model'
import type {
  RequestInterface,
  ListParams,
  ListResponse,
} from '@/core/domain/types'

export type GetAnimalDeathsUseCase = RequestInterface<
  ListParams<AnimalDeathModel> & {
    propertyId: number
    animalId: number
  },
  ListResponse<AnimalDeathModel>
>
