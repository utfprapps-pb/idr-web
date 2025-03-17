import type { AnimalModel } from '../models/animals-model'
import type {
  RequestInterface,
  ListParams,
  ListResponse,
} from '@/core/domain/types'

export type GetAnimalsUseCase = RequestInterface<
  {
    propertyId: string
    queryParams: ListParams<keyof AnimalModel>
  },
  ListResponse<AnimalModel>
>
