import type { ListApiResponse, MapApiProperties } from '@/core/domain/types'

export type HttpMethod = 'get' | 'post' | 'delete' | 'patch'

export enum HttpStatusCode {
  ok = 200,
  created = 201,
  noContent = 204,

  badRequest = 400,
  unauthorized = 401,
  forbidden = 403,
  notFound = 404,

  serverError = 500,
}

export type SortDirection = 'asc' | 'desc'

export type FilterType =
  | 'EQUALS'
  | 'NOT_EQUALS'
  | 'LIKE'
  | 'NOT_LIKE'
  | 'GREATER'
  | 'LESS'
  | 'GREATER_EQUAL'
  | 'LESS_EQUALS'
  | 'IN'
  | 'NOT_IN'
  | 'IS_NULL'
  | 'IS_NOT_NULL'
  | 'BETWEEN'

export type FilterValue = {
  value: string
  type: FilterType
}

export type Filters<TModel> = {
  [key in keyof TModel]?: {
    value: TModel[key]
    type: FilterType
  }
}

export type Sort<TModel> = {
  direction: SortDirection
  field: keyof TModel
}

export type HttpRequest<
  TModel = Record<string, string>,
  TApiModel = unknown,
> = {
  url: string
  method: HttpMethod
  body?: unknown
  filters?: Filters<TModel>
  pagination?: {
    page: number
    perPage?: number
  }
  sort?: Sort<TModel>
  mapApiProperties?: MapApiProperties<TModel, TApiModel>
}

export type HttpResponse<TData = unknown> = {
  statusCode: HttpStatusCode
  body?: ListApiResponse<TData>
}

export type HttpClient<TModel = unknown, TApiModel = unknown> = {
  request: (
    data: HttpRequest<TModel, TApiModel>
  ) => Promise<HttpResponse<TApiModel[]>>
}
