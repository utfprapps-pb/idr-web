import type { AnimalModel } from '@/domain/models/animalModel'
import type {
  IRequestInterface,
  IListParams,
  IListResponse,
} from '@/domain/shared/types'

export type IGetAnimals = IRequestInterface<
  {
    propertyId: string
    queryParams: IListParams<keyof AnimalModel>
  },
  IListResponse<AnimalModel>
>
