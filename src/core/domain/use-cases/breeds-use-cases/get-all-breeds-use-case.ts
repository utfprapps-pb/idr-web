import type {
  RequestInterface,
  ListParams,
  ListResponse,
  Option,
} from '@/core/domain/types'

export type GetAllBreedsUseCase = RequestInterface<
  ListParams<Option>,
  ListResponse<Option>
>
