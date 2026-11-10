import type { AnimalModel } from '../models/animals-model'
import type {
  RequestInterface,
  ListParams,
  ListResponse,
} from '@/core/domain/types'

export type GetAnimalsUseCase = RequestInterface<
  ListParams<AnimalModel> & { propertyId: string },
  ListResponse<AnimalModel>
>
