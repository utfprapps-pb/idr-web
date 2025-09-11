import { ApiHttpClient } from '@/core/infra/http'

export function makeApiHttpClient<
  TModel = unknown,
  TApiModel = unknown,
  TApiResponse = TApiModel,
>(): ApiHttpClient<TModel, TApiModel, TApiResponse> {
  return new ApiHttpClient<TModel, TApiModel, TApiResponse>()
}
