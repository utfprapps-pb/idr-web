import type { RequestInterface } from '@/core/domain/types'

export type SearchRegionsParams = {
  terms?: string
  page?: number
  perPage?: number
}

export type SearchRegionsResult = {
  items: Array<{ id: string; description: string }>
  total: number
}

export type SearchRegionsUseCase = RequestInterface<
  SearchRegionsParams,
  SearchRegionsResult
>
