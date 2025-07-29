import type { Filters, ApiSort } from '@/core/domain/types'

export type MockParams<TData = unknown> = {
  filters: Filters<TData>
  sort: ApiSort<TData>
  page: number
  rows: number
}
