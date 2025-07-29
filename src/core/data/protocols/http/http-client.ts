import type { Filters, MapApiProperties, Sort } from '@/core/domain/types'

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
  body?: TData
}

export type HttpClient<
  TModel = unknown,
  TApiModel = unknown,
  TApiResponse = TApiModel,
> = {
  request: (
    data: HttpRequest<TModel, TApiModel>
  ) => Promise<HttpResponse<TApiResponse>>
}
