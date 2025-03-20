import type { AnimalChildbirthModel } from '../../models/animal-childbirths-model'
import type {
  RequestInterface,
  ListParams,
  ListResponse,
} from '@/core/domain/types'

export type GetAnimalChildbirthsUseCase = RequestInterface<
  {
    propertyId: string
    animalId: string
    queryParams: ListParams<keyof AnimalChildbirthModel>
  },
  ListResponse<AnimalChildbirthModel>
>
