import type {
  RequestInterface,
  Option,
  ListParams,
  ListResponse,
} from '@/core/domain/types'

export type GetAllUsersUseCase = RequestInterface<
  ListParams<Option>,
  ListResponse<Option>
>
