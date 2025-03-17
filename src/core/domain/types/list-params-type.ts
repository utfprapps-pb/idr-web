import { SortDirection } from '@tanstack/react-table'

import { HttpRequest } from '@/core/data/protocols/http'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Filters<TKeyOfModel extends keyof any = string> = Record<
  TKeyOfModel,
  string
>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Sort<TKeyOfModel extends keyof any = string> = {
  direction: SortDirection
  field: TKeyOfModel
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ListParams<TKeyOfModel extends keyof any = string> = {
  filters?: Filters
  sort?: Sort<TKeyOfModel>
  pagination: HttpRequest['pagination']
}
