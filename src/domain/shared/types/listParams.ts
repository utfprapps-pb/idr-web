import { SortDirection } from '@tanstack/react-table'

import { HttpRequest } from '@/data/protocols/http'

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
export interface IListParams<TKeyOfModel extends keyof any = string> {
  filters?: Filters
  sort?: Sort<TKeyOfModel>
  pagination: HttpRequest['pagination']
}
