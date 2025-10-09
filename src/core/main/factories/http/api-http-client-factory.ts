import { ApiHttpClient } from '@/core/infra/http'

export function makeApiHttpClient<
  TModel = unknown,
  TApiModel = unknown,
  TApiResponse = TApiModel,
>(p0: { method: string }): ApiHttpClient<TModel, TApiModel, TApiResponse> {
  return new ApiHttpClient<TModel, TApiModel, TApiResponse>()
}
