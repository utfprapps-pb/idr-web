import {
  HttpRequest,
  type Filters,
  type Sort,
} from '@/core/data/protocols/http'

export type ListParams<TModel = Record<string, string>> = {
  filters?: Filters<TModel>
  sort?: Sort<TModel>
  pagination: HttpRequest['pagination']
}
