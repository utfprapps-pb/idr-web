import type { ApiSort } from '@/core/domain/types'

export type MockFilter<TData = unknown, K extends keyof TData = keyof TData> = {
  field: K
  value: TData[K] | Array<TData[K]>
  type: string
}

export type MockParams<TData = unknown> = {
  filters: Array<MockFilter<TData>>
  sort: ApiSort<TData>
  page: number
  rows: number
}
