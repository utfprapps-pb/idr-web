import type { AnimalChildBirthModel } from '../../models/animal-childbirths-model'
import type {
  RequestInterface,
  ListParams,
  ListResponse,
} from '@/core/domain/types'

export type GetAnimalChildBirthsUseCase = RequestInterface<
  {
    propertyId: string
    animalId: string
    queryParams: ListParams<keyof AnimalChildBirthModel>
  },
  ListResponse<AnimalChildBirthModel>
>
