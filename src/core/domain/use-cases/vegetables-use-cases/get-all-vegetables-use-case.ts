import type {
  RequestInterface,
  ListParams,
  ListResponse,
  Option,
} from '@/core/domain/types'

export type GetAllVegetablesUseCase = RequestInterface<
  ListParams<Option>,
  ListResponse<Option>
>
