import type { Filters } from './filter-type'
import type { Sort } from './sort-type'
import type { HttpRequest } from '@/core/data/protocols/http'

export type ListParams<TModel = Record<string, string>> = {
  filters?: Filters<TModel>
  sort?: Sort<TModel>
  pagination: HttpRequest['pagination']
}
