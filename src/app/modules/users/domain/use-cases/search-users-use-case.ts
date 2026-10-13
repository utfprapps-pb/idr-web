import type { RequestInterface } from '@/core/domain/types'

export type SearchUsersParams = {
  terms?: string
  page?: number
  perPage?: number
}

export type SearchUsersResult = {
  items: Array<{ id: string; name: string }>
  total: number
}

export type SearchUsersUseCase = RequestInterface<
  SearchUsersParams,
  SearchUsersResult
>
