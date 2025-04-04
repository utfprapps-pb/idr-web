import { SortDirection } from '@tanstack/react-table'

import { HttpRequest } from '@/core/data/protocols/http'

export type Filters<TModel = Record<string, string>> = {
  [key in keyof TModel]?: TModel[key]
}

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
