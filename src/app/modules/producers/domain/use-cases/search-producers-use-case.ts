import type { RequestInterface } from '@/core/domain/types'

export type SearchProducersParams = {
  terms?: string
  page?: number
  perPage?: number
}

export type SearchProducersResult = {
  items: Array<{ id: string; name: string }>
  total: number
}

export type SearchProducersUseCase = RequestInterface<
  SearchProducersParams,
  SearchProducersResult
>
