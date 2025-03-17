import type { AnimalChildBirthModel } from '../models/animal-child-births-model'
import type {
  RequestInterface,
  ListParams,
  ListResponse,
} from '@/core/domain/types'

export type GetAnimalChildBirthsUseCase = RequestInterface<
  {
    propertyId: string
    queryParams: ListParams<keyof AnimalChildBirthModel>
  },
  ListResponse<AnimalChildBirthModel>
>
